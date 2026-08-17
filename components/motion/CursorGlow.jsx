"use client";

import { useEffect, useState } from "react";

// Smooth, subtle cursor-follow glow — decorative, desktop only.
export default function CursorGlow() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[5] hidden h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full 
      bg-primary/5 blur-3xl transition-transform duration-300 ease-out md:block"
      style={{ left: cursor.x, top: cursor.y }}
      aria-hidden="true"
    />
  );
}
