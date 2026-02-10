"use client";

import { useEffect } from "react";

const RemoveSplash = () => {
  useEffect(() => {
    const splash = document.getElementById("splash");
    if (!splash) return;

    splash.classList.add("opacity-0");
    setTimeout(() => splash.remove(), 300);
  }, []);

  return null;
};

export default RemoveSplash;