"use client";

import React, { useRef } from "react";

export interface BentoTiltProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoTilt: React.FC<BentoTiltProps> = ({
  children,
  className = "",
}) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const boundsRef = useRef<DOMRect | null>(null);

  const calculateTilt = (clientX: number, clientY: number) => {
    if (!itemRef.current || !boundsRef.current) return;

    const { left, top, width, height } = boundsRef.current;

    const relativeX = (clientX - left) / width;
    const relativeY = (clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 6;
    const tiltY = (relativeX - 0.5) * -6;

    itemRef.current.style.transform = `
      perspective(700px)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
      scale3d(.96,.96,.96)
    `;
  };

  const handlePointerEnter = () => {
    if (!itemRef.current) return;
    boundsRef.current = itemRef.current.getBoundingClientRect();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    // Desktop hover behavior
    if (e.pointerType === "mouse") {
      calculateTilt(e.clientX, e.clientY);
    }

    // Mobile drag behavior
    if (e.pointerType === "touch" && isDragging.current) {
      calculateTilt(e.clientX, e.clientY);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "touch") return;

    if (!itemRef.current) return;

    isDragging.current = true;
    boundsRef.current = itemRef.current.getBoundingClientRect();
    itemRef.current.setPointerCapture(e.pointerId);
  };

  const resetTilt = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    isDragging.current = false;
    boundsRef.current = null;

    if (e && itemRef.current.hasPointerCapture(e.pointerId)) {
      itemRef.current.releasePointerCapture(e.pointerId);
    }

    itemRef.current.style.transform = `
      perspective(800px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1,1,1)
    `;
  };

  return (
    <div
      ref={itemRef}
      className={`${className} transition-transform duration-300 ease-out`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerDown={handlePointerDown}
      onPointerUp={resetTilt}
      onPointerCancel={resetTilt}
    >
      {children}
    </div>
  );
};

export default BentoTilt;
