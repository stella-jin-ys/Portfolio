"use client";

import { useEffect, useState } from "react";

const items = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export function OptionWheel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className={`option-wheel ${open ? "is-open" : ""}`}>
      <nav className="wheel-options" aria-label="Section menu">
        {items.map((item, index) => (
          <a className="cursor-target" href={item.href} key={item.href} onClick={() => setOpen(false)} style={{ "--item-index": index, "--wheel-delay": `${index * 55}ms` } as React.CSSProperties}>{item.label}</a>
        ))}
      </nav>
      <button className="cursor-target" type="button" aria-label={open ? "Close section menu" : "Open section menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span /><span /><span />
      </button>
    </div>
  );
}
