// components/HackedText.tsx
import React, { useEffect, useRef, useState } from 'react';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface HackedTextProps {
  children: string; // Restrict children to string for simplicity
  className?: string; // Allow passing additional Tailwind classes
  tag?: keyof React.JSX.IntrinsicElements; // Allow specifying the HTML tag (e.g., 'h1', 'p', 'span')
  playOnLoad?: boolean;
}

const HackedText: React.FC<HackedTextProps> = ({ children, className, tag: Tag = 'span', playOnLoad = true }) => {
  const [displayText, setDisplayText] = useState(children); // State to hold the currently displayed text
  const initialText = useRef<string>(children); // Store the original text
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Use ref to store interval

  // Update initialText and reset displayText if children prop changes
  useEffect(() => {
    initialText.current = children;
    setDisplayText(children); // Reset displayed text when children change
  }, [children]);

  // Function to run the hacking animation
  const runHackingAnimation = () => {
    let iteration = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const targetText = initialText.current; // The full original text

      // Use setDisplayText to update the state, letting React re-render
      setDisplayText((prevText) => {
        return targetText
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return char; // Reveal the original character
            }

            // Preserve whitespace and newlines if they are not meant to be randomized
            if (char === ' ' || char === '\n' || char === '\t') {
                return char;
            }

            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");
      });

      if (iteration >= targetText.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
      iteration += 1 / 3;
    }, 30);
  };

  // Effect to run animation on load if playOnLoad is true
  useEffect(() => {
    if (playOnLoad) {
      // Add a small delay to ensure the component is fully mounted
      const timeout = setTimeout(() => {
        runHackingAnimation();
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [playOnLoad]);

  // Effect for the mouseover event
  useEffect(() => {
    const handleMouseOver = () => {
      runHackingAnimation();
    };

    // Attach event listener only if the component is mounted
    const currentTextElement = document.getElementById(`hacked-text-${children.replace(/\s/g, '-')}`);
    if (currentTextElement) {
      currentTextElement.addEventListener('mouseover', handleMouseOver);
    }

    // Cleanup function to remove event listener and clear interval
    return () => {
      if (currentTextElement) {
        currentTextElement.removeEventListener('mouseover', handleMouseOver);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [children]); // Re-run effect if children changes

  return (
    <Tag
      // Assign a unique ID for the event listener to attach to
      id={`hacked-text-${children.replace(/\s/g, '-')}`}
      className={`
        font-['Space Mono'] text-white text-clamp-3rem-10vw-10rem px-clamp-1rem-2vw-3rem rounded-clamp-0-4rem-0-75vw-1rem
        transition-all duration-300
        whitespace-pre-wrap
        ${className || ''}
      `}
    >
      {displayText} {/* Render the state-managed text */}
    </Tag>
  );
};

export default HackedText;