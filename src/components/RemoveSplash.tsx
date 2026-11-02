"use client";

import { useEffect } from "react";

const RemoveSplash = () => {
  useEffect(() => {
    const splash = document.getElementById("splash");
    if (!splash) return;

    const hideSplash = () => {
      // trigger fade-out
      splash.classList.add("splash-hide");

      // remove from DOM after animation
      setTimeout(() => {
        splash.remove();
      }, 500); // must match duration-500
    };

    // Wait for all assets (images, fonts, scripts, etc.) to load
    if (document.readyState === "complete") {
      // Already loaded
      hideSplash();
    } else {
      // Wait for load event
      window.addEventListener("load", hideSplash);
      return () => window.removeEventListener("load", hideSplash);
    }
  }, []);

  return null;
};

export default RemoveSplash;
