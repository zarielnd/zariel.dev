"use client";

import { useEffect, useState } from "react";

const RemoveSplash = () => {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let removeTimer: ReturnType<typeof setTimeout>;

    const hideSplash = () => {
      // trigger fade-out
      setHidden(true);

      // unmount via React after animation so React's Fiber tree stays in sync with the DOM
      removeTimer = setTimeout(() => {
        setRemoved(true);
      }, 500); // must match duration-500
    };

    // Fallback safety timeout (1200ms) so slow networks and web crawlers are never blocked
    const fallbackTimer = setTimeout(hideSplash, 1200);

    // Wait for all assets (images, fonts, scripts, etc.) to load
    if (document.readyState === "complete") {
      // Already loaded
      hideSplash();
    } else {
      // Wait for load event
      window.addEventListener("load", hideSplash);
    }

    return () => {
      clearTimeout(fallbackTimer);
      clearTimeout(removeTimer);
      window.removeEventListener("load", hideSplash);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      id="splash"
      className={`splash${hidden ? " splash-hide" : ""}`}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="spinner-border" />
    </div>
  );
};

export default RemoveSplash;
