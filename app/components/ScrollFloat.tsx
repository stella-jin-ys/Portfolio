"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

function letters(text: string, offset = 0) {
  return [...text].map((letter, index) => <span className="scroll-float-char" style={{ "--char-index": offset + index } as CSSProperties} key={`${letter}-${index}`}>{letter === " " ? "\u00a0" : letter}</span>);
}

export function ScrollFloat({ id, lead, accent }: { id: string; lead: string; accent: string }) {
  const heading = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .35 });
    if (heading.current) observer.observe(heading.current);
    return () => observer.disconnect();
  }, []);

  return <h2 className={`scroll-float ${visible ? "is-visible" : ""}`} id={id} ref={heading}><em>{letters(lead)}</em><span className="scroll-float-join"> and </span><span>{letters(accent, lead.length + 5)}</span></h2>;
}
