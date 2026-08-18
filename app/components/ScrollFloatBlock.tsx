"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollFloatBlockProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollFloatBlock({ children, className = "" }: ScrollFloatBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.18 },
    );

    if (blockRef.current) observer.observe(blockRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={blockRef} className={`${className} scroll-float-block${isVisible ? " is-visible" : ""}`}>
      {children}
    </div>
  );
}
