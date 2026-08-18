"use client";

import { useRef, type PointerEvent } from "react";

export function FluidGlassHero() {
  const glass = useRef<HTMLDivElement>(null);

  const moveGlass = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    glass.current?.style.setProperty("--glass-x", `${event.clientX - bounds.left}px`);
    glass.current?.style.setProperty("--glass-y", `${event.clientY - bounds.top}px`);
    glass.current?.style.setProperty("--glass-tilt-x", `${((event.clientY - bounds.top) / bounds.height - .5) * -14}deg`);
    glass.current?.style.setProperty("--glass-tilt-y", `${((event.clientX - bounds.left) / bounds.width - .5) * 14}deg`);
  };

  return <div className="fluid-glass" ref={glass} onPointerMove={moveGlass} aria-hidden="true">
    <span data-fluid-layer="one" /><span data-fluid-layer="two" /><span data-fluid-layer="three" />
  </div>;
}
