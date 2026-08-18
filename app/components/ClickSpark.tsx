"use client";

import { useState, type PointerEvent, type ReactNode } from "react";

type Spark = { id: number; x: number; y: number };

export function ClickSpark({ children }: { children: ReactNode }) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  const spark = (event: PointerEvent<HTMLDivElement>) => {
    const id = Date.now();
    const next = { id, x: event.clientX, y: event.clientY };
    setSparks((current) => [...current.slice(-4), next]);
    window.setTimeout(() => setSparks((current) => current.filter((item) => item.id !== id)), 620);
  };

  const illuminate = (event: PointerEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element)) return;
    const surface = event.target.closest<HTMLElement>(".glow-surface");
    if (!surface) return;
    const bounds = surface.getBoundingClientRect();
    surface.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
    surface.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <div className="click-spark-root" onPointerDown={spark} onPointerMove={illuminate}>
      {children}
      {sparks.map((item) => (
        <span data-click-spark className="click-spark" aria-hidden="true" key={item.id} style={{ left: item.x, top: item.y }}>
          {Array.from({ length: 8 }, (_, index) => <i key={index} style={{ "--ray": index } as React.CSSProperties} />)}
        </span>
      ))}
    </div>
  );
}
