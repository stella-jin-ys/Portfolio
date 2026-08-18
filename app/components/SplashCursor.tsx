"use client";

import { useEffect, useRef } from "react";

type Drop = { x: number; y: number; radius: number; alpha: number; hue: number };

export function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const drops: Drop[] = [];
    let frame = 0;
    let last = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const move = (event: PointerEvent) => {
      if (performance.now() - last < 28) return;
      last = performance.now();
      drops.push({ x: event.clientX, y: event.clientY, radius: 4, alpha: .34, hue: 155 + Math.random() * 45 });
      if (drops.length > 34) drops.shift();
    };
    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      drops.forEach((drop) => {
        drop.radius += 1.8;
        drop.alpha *= .94;
        const wash = context.createRadialGradient(drop.x, drop.y, 0, drop.x, drop.y, drop.radius);
        wash.addColorStop(0, `hsla(${drop.hue}, 92%, 72%, ${drop.alpha})`);
        wash.addColorStop(.45, `hsla(${drop.hue + 35}, 88%, 62%, ${drop.alpha * .55})`);
        wash.addColorStop(1, "transparent");
        context.fillStyle = wash;
        context.beginPath();
        context.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
        context.fill();
      });
      for (let index = drops.length - 1; index >= 0; index -= 1) if (drops[index].alpha < .012) drops.splice(index, 1);
      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas className="splash-cursor" ref={canvasRef} aria-hidden="true" />;
}
