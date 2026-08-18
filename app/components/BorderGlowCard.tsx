"use client";

import { type PointerEvent, type ReactNode } from "react";

export function BorderGlowCard({ children }: { children: ReactNode }) {
  const followPointer = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
  };

  return <article className="project-card glow-surface" onPointerMove={followPointer}>{children}</article>;
}
