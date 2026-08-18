"use client";

import { useEffect, useRef } from "react";

export function TargetCursor() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (event: PointerEvent) => {
      const node = cursor.current;
      if (!node || !(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>(".cursor-target");

      if (target) {
        const bounds = target.getBoundingClientRect();
        node.dataset.active = "true";
        node.style.setProperty("--cursor-x", `${bounds.left - 7}px`);
        node.style.setProperty("--cursor-y", `${bounds.top - 7}px`);
        node.style.setProperty("--cursor-w", `${bounds.width + 14}px`);
        node.style.setProperty("--cursor-h", `${bounds.height + 14}px`);
      } else {
        node.dataset.active = "false";
        node.style.setProperty("--cursor-x", `${event.clientX - 15}px`);
        node.style.setProperty("--cursor-y", `${event.clientY - 15}px`);
        node.style.setProperty("--cursor-w", "30px");
        node.style.setProperty("--cursor-h", "30px");
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return <div className="target-cursor" ref={cursor} aria-hidden="true"><i /><i /><i /><i /><span /></div>;
}
