import { useEffect, useRef, useState } from "react";
import { Globe } from "./Globe";

export const SmartGlobe = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [paused, setPaused] = useState(true);

  // Observe visibility
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Control pause timing
  useEffect(() => {
    if (isVisible) {
      setPaused(false); // resume immediately
    } else {
      // delay destroy until fade finishes
      const timeout = setTimeout(() => {
        setPaused(true);
      }, 500); // match fade duration

      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={`transition-opacity duration-500 ease-out  ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Globe paused={paused} />
    </div>
  );
};
