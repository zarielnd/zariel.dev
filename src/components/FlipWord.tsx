import React, { useState, useEffect, useCallback, useRef } from "react";
import { twMerge } from "tailwind-merge";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface HackedFlipWordsProps {
  words: string[];
  duration?: number; // Duration in milliseconds for each word to be displayed
  className?: string; // Additional Tailwind classes
}

export const FlipWord: React.FC<HackedFlipWordsProps> = ({
  words,
  duration = 3000,
  className,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState(words[0]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const runHackingAnimation = useCallback((targetWord: string) => {
    let iteration = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setDisplayText(
        targetWord
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return char;
            }
            if (char === " " || char === "\n" || char === "\t") {
              return char;
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join(""),
      );

      if (iteration >= targetWord.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
      iteration += 1 / 3;
    }, 30);
  }, []);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    if (!currentWord) return;

    runHackingAnimation(currentWord);

    const wordChangeInterval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => {
      clearInterval(wordChangeInterval);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentWordIndex, words, duration, runHackingAnimation]);

  return (
    <div className={twMerge("inline-block relative text-left", className)}>
      <span className={twMerge("whitespace-nowrap", className)}>
        {displayText}
      </span>
    </div>
  );
};
export default FlipWord;
