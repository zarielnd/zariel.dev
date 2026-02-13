"use client";
import { useEffect, useRef, useMemo, useCallback } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { twMerge } from "tailwind-merge";

const MOVEMENT_DAMPING = 1400;

// Adaptive DPR based on device capabilities
const getOptimalDPR = (): number => {
  if (typeof window === "undefined") return 1;

  const dpr = window.devicePixelRatio;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;

  // Lower DPR for devices with fewer cores
  if (hardwareConcurrency <= 4) return 1;
  if (hardwareConcurrency <= 8) return Math.min(dpr, 1.25);
  return Math.min(dpr, 1.5);
};

// Adaptive settings based on device and user preferences
const getAdaptiveSettings = () => {
  if (typeof window === "undefined") {
    return { mapSamples: 4000, targetFPS: 30 };
  }

  const isMobile = window.innerWidth < 768;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  return {
    mapSamples: isMobile ? 3000 : 4000,
    targetFPS: prefersReducedMotion ? 20 : 30,
  };
};

const dpr = getOptimalDPR();

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: dpr,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: getAdaptiveSettings().mapSamples,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [1, 1, 1],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
  paused = false,
}: {
  className?: string;
  config?: COBEOptions;
  paused?: boolean;
}) {
  const phiRef = useRef(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const isVisible = useRef(true);
  const lastFrameTime = useRef(0);
  const widthRef = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 40,
    stiffness: 80,
    restSpeed: 0.001,
  });

  // Memoize config to prevent unnecessary re-renders
  const memoizedConfig = useMemo(
    () => ({
      ...GLOBE_CONFIG,
      ...config,
    }),
    [config],
  );

  const targetFPS = useMemo(() => getAdaptiveSettings().targetFPS, []);
  const frameInterval = 1000 / targetFPS;

  // Update pointer interaction state
  const updatePointerInteraction = useCallback((value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  }, []);

  // Handle pointer movement
  const updateMovement = useCallback(
    (clientX: number) => {
      if (pointerInteracting.current !== null) {
        const delta = clientX - pointerInteracting.current;
        pointerInteractionMovement.current = delta;
        r.set(r.get() + delta / MOVEMENT_DAMPING);
      }
    },
    [r],
  );

  // Debounced resize handler
  const onResize = useCallback(() => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  }, []);

  // Visibility change handler - pause when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisible.current = !document.hidden;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Intersection observer - pause when off-screen
  useEffect(() => {
    if (!canvasRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          isVisible.current = entry.isIntersecting;
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(canvasRef.current);

    return () => observer.disconnect();
  }, []);

  // Main globe initialization effect
  useEffect(() => {
    if (paused) {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
      return;
    }

    let resizeTimeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(onResize, 150);
    };

    window.addEventListener("resize", debouncedResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...memoizedConfig,
      width: widthRef.current,
      height: widthRef.current,
      onRender: (state) => {
        // Skip rendering if not visible or paused
        if (!isVisible.current || paused) return;

        const now = performance.now();
        const elapsed = now - lastFrameTime.current;

        // Frame rate limiting
        if (elapsed < frameInterval) return;

        // Adjust for drift
        lastFrameTime.current = now - (elapsed % frameInterval);

        // Update rotation
        if (!pointerInteracting.current) {
          phiRef.current += 0.01;
        }
        const size = Math.min(widthRef.current, 600);

        state.width = size;
        state.height = size;
        state.phi = phiRef.current + rs.get();
      },
    });

    globeRef.current = globe;

    // Fade in effect
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 0);

    return () => {
      clearTimeout(resizeTimeoutId);
      globe.destroy();
      globeRef.current = null;
      window.removeEventListener("resize", debouncedResize);
    };
  }, [paused, rs, memoizedConfig, onResize, frameInterval]);

  return (
    <div
      className={twMerge(
        "mx-auto w-[30rem] max-w-full aspect-square",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0 transition-opacity duration-500"
        onPointerDown={(e) => {
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
