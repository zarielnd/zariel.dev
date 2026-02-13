import React, { useEffect, useRef, useState, useCallback } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface HackedTextProps {
  id?: string;
  children: string;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  playOnLoad?: boolean;
  hoverAnimation?: boolean;
}

const HackedText: React.FC<HackedTextProps> = ({
  id,
  children,
  className,
  tag: Tag = "span",
  playOnLoad = true,
  hoverAnimation = false,
}) => {
  const lines = children.split("\n");
  const initialLines = useRef<string[]>(lines);
  const intervalRefs = useRef<(NodeJS.Timeout | null)[]>([]);
  const [displayLines, setDisplayLines] = useState<string[]>(lines);

  useEffect(() => {
    initialLines.current = children.split("\n");
    setDisplayLines(initialLines.current);
  }, [children]);

  const runLineAnimation = useCallback((lineIndex: number) => {
    let iteration = 0;
    const targetText = initialLines.current[lineIndex];

    if (intervalRefs.current[lineIndex]) {
      clearInterval(intervalRefs.current[lineIndex]!);
    }
    if (!targetText) return;
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
  }, []);

  const runAllAnimations = useCallback(() => {
    initialLines.current.forEach((_, idx) => runLineAnimation(idx));
  }, [runLineAnimation]);

  useEffect(() => {
    if (playOnLoad) {
      const timeout = setTimeout(() => {
        runAllAnimations();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [playOnLoad, children, runAllAnimations]);

  useEffect(() => {
    if (!hoverAnimation) return;
    const elementId = id ?? `hacked-text-${children.replace(/\s/g, "-")}`;
    const currentTextElement = document.getElementById(elementId);
    if (currentTextElement) {
      const handleMouseOver = () => {
        runAllAnimations();
      };
      currentTextElement.addEventListener("mouseover", handleMouseOver);

      // Copy the ref to avoid stale closure
      const currentIntervalRefs = intervalRefs.current;

      return () => {
        currentTextElement.removeEventListener("mouseover", handleMouseOver);
        currentIntervalRefs.forEach((interval) => {
          if (interval !== null) clearInterval(interval);
        });
      };
    }
  }, [id, children, runAllAnimations]);

  return (
    <Tag
      id={id ?? `hacked-text-${children.replace(/\s/g, "-")}`}
      className={`
        font-['Space Mono'] text-white text-clamp-3rem-10vw-10rem 
        px-clamp-1rem-2vw-3rem rounded-clamp-0-4rem-0-75vw-1rem 
        transition-all duration-300 whitespace-pre-wrap 
        ${className || ""}
      `}
    >
      {displayLines.join("\n")}
    </Tag>
  );
};

export default HackedText;
