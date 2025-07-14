import React, { useEffect, useRef, useState } from 'react';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface HackedTextProps {
  id?: string;
  children: string;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  playOnLoad?: boolean;
}

const HackedText: React.FC<HackedTextProps> = ({
  id,
  children,
  className,
  tag: Tag = 'span',
  playOnLoad = true,
}) => {
  const lines = children.split('\n');
  const initialLines = useRef<string[]>(lines);
  const intervalRefs = useRef<(NodeJS.Timeout | null)[]>([]);
  const [displayLines, setDisplayLines] = useState<string[]>(lines);

  useEffect(() => {
    initialLines.current = children.split('\n');
    setDisplayLines(initialLines.current);
  }, [children]);

  const runLineAnimation = (lineIndex: number) => {
    let iteration = 0;
    const targetText = initialLines.current[lineIndex];

    if (intervalRefs.current[lineIndex]) {
      clearInterval(intervalRefs.current[lineIndex]!);
    }

    intervalRefs.current[lineIndex] = setInterval(() => {
      setDisplayLines((prevLines) => {
        const newLines = [...prevLines];
        newLines[lineIndex] = targetText
          .split("")
          .map((char, index) => {
            if (index < iteration) return char;
            if (char === " " || char === "\n" || char === "\t") return char;
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");
        return newLines;
      });

      iteration += 1 / 3;
      if (iteration >= targetText.length) {
        clearInterval(intervalRefs.current[lineIndex]!);
      }
    }, 30);
  };

  const runAllAnimations = () => {
    lines.forEach((_, idx) => runLineAnimation(idx));
  };

  useEffect(() => {
    if (playOnLoad) {
      const timeout = setTimeout(() => {
        runAllAnimations();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [playOnLoad, children]);

  useEffect(() => {
    const elementId = id ?? `hacked-text-${children.replace(/\s/g, '-')}`;
    const currentTextElement = document.getElementById(elementId);
    if (currentTextElement) {
      const handleMouseOver = () => {
        runAllAnimations();
      };
      currentTextElement.addEventListener('mouseover', handleMouseOver);
      return () => {
        currentTextElement.removeEventListener('mouseover', handleMouseOver);
        intervalRefs.current.forEach((interval) => {
          if (interval !== null) clearInterval(interval);
        });

      };
    }
  }, [children]);

  return (
    <Tag
      id={id ?? `hacked-text-${children.replace(/\s/g, '-')}`}
      className={`
        font-['Space Mono'] text-white text-clamp-3rem-10vw-10rem 
        px-clamp-1rem-2vw-3rem rounded-clamp-0-4rem-0-75vw-1rem 
        transition-all duration-300 whitespace-pre-wrap 
        ${className || ''}
      `}
    >
      {displayLines.join('\n')}
    </Tag>
  );
};

export default HackedText;
