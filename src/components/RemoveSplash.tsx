"use client";

import { useEffect } from "react";

const RemoveSplash = () => {
  useEffect(() => {
    const splash = document.getElementById("splash");
    if (!splash) return;

    // trigger fade-out
    splash.classList.add("splash-hide");

    // remove from DOM after animation
    const timeout = setTimeout(() => {
      splash.remove();
    }, 500); // must match duration-500

    return () => clearTimeout(timeout);
  }, []);

  return null;
};

export default RemoveSplash;