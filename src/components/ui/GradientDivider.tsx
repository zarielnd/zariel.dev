import React from "react";

interface GradientDividerProps {
  className?: string;
}

export const GradientDivider: React.FC<GradientDividerProps> = ({
  className = "mt-12",
}) => {
  return (
    <div
      className={`bg-gradient-to-r from-transparent via-neutral-950 to-transparent h-[1px] w-full ${className}`}
      aria-hidden="true"
    />
  );
};

export default GradientDivider;
