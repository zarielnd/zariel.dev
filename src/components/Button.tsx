import React from "react";

interface ButtonProps {
  title: string;
  id?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  containerClass?: string;
  scrollTarget?: string;
  onClick?: () => void;
}

const Button = ({
  title,
  id,
  rightIcon,
  leftIcon,
  containerClass = "",
  scrollTarget,
  onClick,
}: ButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <button
      type="button"
      id={id}
      onClick={handleClick}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden text-xs uppercase">
        <span>{title}</span>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
