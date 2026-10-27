"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

export function ScrollMotion({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let lastScrollY = window.scrollY;
    const update = () => {
      const rect = element.getBoundingClientRect();
      const distance = rect.top + rect.height / 2 - window.innerHeight / 2;
      const progress = Math.max(-1, Math.min(1, distance / window.innerHeight));
      element.style.setProperty("--scroll-progress", progress.toFixed(3));
      element.style.setProperty("--scroll-direction", window.scrollY > lastScrollY ? "1" : "-1");
      lastScrollY = window.scrollY;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  return <div ref={ref} className={`scroll-motion ${className}`}>{children}</div>;
}
