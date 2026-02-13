import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export interface HackedTextHandle {
  play: () => void;
}

export interface HackedTextProps {
  id?: string;
  children: string;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  playOnLoad?: boolean;
  hoverAnimation?: boolean;
}

const HackedText = forwardRef<HackedTextHandle, HackedTextProps>(
  (
    {
      id,
      children,
      className,
      tag: Tag = "span",
      playOnLoad = true,
      hoverAnimation = false,
    },
    ref,
  ) => {
    const initialLines = useRef<string[]>(children.split("\n"));
    const intervalRefs = useRef<(number | null)[]>([]);
    const [displayLines, setDisplayLines] = useState<string[]>(
      children.split("\n"),
    );

    useEffect(() => {
      const newLines = children.split("\n");
      initialLines.current = newLines;
      setDisplayLines(newLines);
    }, [children]);

    const runLineAnimation = useCallback((lineIndex: number) => {
      let iteration = 0;
      const targetText = initialLines.current[lineIndex];
      if (!targetText) return;

      if (intervalRefs.current[lineIndex] !== null) {
        clearInterval(intervalRefs.current[lineIndex]!);
      }

      intervalRefs.current[lineIndex] = window.setInterval(() => {
        setDisplayLines((prev) => {
          const newLines = [...prev];

          newLines[lineIndex] = targetText
            .split("")
            .map((char, index) => {
              if (index < iteration) return char;
              if (char === " " || char === "\n" || char === "\t") return char;
              return LETTERS[Math.floor(Math.random() * LETTERS.length)];
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

    // expose to parent (GSAP scroll)
    useImperativeHandle(ref, () => ({
      play: runAllAnimations,
    }));

    // play on mount
    useEffect(() => {
      if (!playOnLoad) return;
      runAllAnimations();
    }, [playOnLoad, runAllAnimations]);

    // cleanup
    useEffect(() => {
      const intervals = intervalRefs.current;

      return () => {
        intervals.forEach((interval) => {
          if (interval !== null) clearInterval(interval);
        });
      };
    }, []);

    return (
      <Tag
        id={id}
        onMouseEnter={hoverAnimation ? runAllAnimations : undefined}
        className={`whitespace-pre-wrap ${className ?? ""}`}
      >
        {displayLines.join("\n")}
      </Tag>
    );
  },
);

HackedText.displayName = "HackedText";
export default HackedText;
