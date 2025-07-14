import React from 'react'

interface ButtonProps {
  title: string,
  id?: string,
    rightIcon?: React.ReactNode,
    leftIcon?: React.ReactNode,
  containerClass?: string,
  scrollTarget?: string
}

const Button = ({ title, id, rightIcon, leftIcon, containerClass, scrollTarget }: ButtonProps) => {
  const handleClick = () => {
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      id={id}
      onClick={handleClick}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}
      <span className='relative inline-flex overflow-hidden text-xs uppercase'>
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};


export default Button