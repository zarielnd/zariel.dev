"use client";

import { useEffect, useRef, useState } from "react";
import { Frameworks } from "./Frameworks";

export const SmartFrameworks = ({
  observeRef,
}: {
  observeRef?: React.RefObject<HTMLDivElement | null>;
}) => {
  const fallbackRef = useRef<HTMLDivElement | null>(null);
  const target = observeRef ?? fallbackRef;
  const [shouldMount, setShouldMount] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const mountObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldMount(true);
          mountObserver.disconnect();
        }
      },
      { threshold: 0, rootMargin: "400px 0px" },
    );
    mountObserver.observe(el);
    return () => mountObserver.disconnect();
  }, [target]);

  useEffect(() => {
    const el = target.current;
    if (!el || !shouldMount) return;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const nowVisible = !!entries[0]?.isIntersecting;
        setIsVisible(nowVisible);
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(el);
    return () => visibilityObserver.disconnect();
  }, [shouldMount, target]);

  return (
    <div ref={observeRef ? undefined : fallbackRef} className="size-full">
      {shouldMount && <Frameworks paused={!isVisible} />}
    </div>
  );
};
