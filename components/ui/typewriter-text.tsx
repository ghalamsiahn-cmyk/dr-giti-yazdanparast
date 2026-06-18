"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
  text: string;
  /** ms per character */
  speed?: number;
  /** called once all characters are rendered */
  onComplete?: () => void;
  className?: string;
  /** controls when typing begins */
  isActive: boolean;
  showCursor?: boolean;
}

export function TypewriterText({
  text,
  speed = 30,
  onComplete,
  className = "",
  isActive,
  showCursor = true,
}: TypewriterTextProps) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isActive) return;

    // reset if re-activated (safety)
    setCount(0);
    setDone(false);

    let i = 0;
    intervalRef.current = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        clearInterval(intervalRef.current!);
        setDone(true);
        onCompleteRef.current?.();
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, text, speed]);

  return (
    <span className={className}>
      {/* placeholder so layout doesn't jump: invisible full text behind */}
      <span aria-hidden="true" className="invisible absolute select-none pointer-events-none">
        {text}
      </span>
      {/* visible typed slice */}
      <span>{text.slice(0, count)}</span>
      {/* blinking cursor */}
      {showCursor && isActive && !done && (
        <span
          aria-hidden="true"
          className="inline-block w-[1.5px] h-[0.9em] bg-current align-middle mx-[2px] animate-blink"
          style={{ verticalAlign: "-0.05em" }}
        />
      )}
    </span>
  );
}
