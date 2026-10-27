"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useTheme } from "next-themes";

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  color: string;
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (resolvedTheme || theme) === "dark" : true;

  // Gentle high-tech audio chime using Web Audio API
  const playToggleSound = useCallback((toDark: boolean) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.018, now);

      if (toDark) {
        // Futuristic descending cyber blip
        osc.type = "sine";
        osc.frequency.setValueAtTime(840, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
      } else {
        // Uplifting celestial morning chime
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
      }

      osc.start(now);
      osc.stop(now + 0.15);
      setTimeout(() => ctx.close().catch(() => {}), 250);
    } catch {
      // Audio autoplay policy or unavailable - silently ignore
    }
  }, []);

  // Trigger burst particles
  const spawnParticles = useCallback((toDark: boolean) => {
    const newParticles: Particle[] = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: 0,
      y: 0,
      angle: (i * (360 / 8)) * (Math.PI / 180),
      distance: 18 + Math.random() * 12,
      color: toDark ? "#00d2f7" : "#f59e0b",
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 600);
  }, []);

  const handleToggle = useCallback((e?: React.MouseEvent) => {
    const nextTheme = isDark ? "light" : "dark";
    playToggleSound(!isDark);
    spawnParticles(!isDark);

    // Smooth circular ripple transition if browser supports startViewTransition
    const supportsViewTransition = typeof document !== "undefined" && "startViewTransition" in document;

    if (supportsViewTransition && e) {
      const x = e.clientX;
      const y = e.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = (document as unknown as { startViewTransition: (cb: () => void) => { ready: Promise<void> } }).startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        document.documentElement.animate(
          {
            clipPath: nextTheme === "dark" ? clipPath : [...clipPath].reverse(),
          },
          {
            duration: 450,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: nextTheme === "dark" ? "::view-transition-new(root)" : "::view-transition-old(root)",
          }
        );
      });
    } else {
      setTheme(nextTheme);
    }
  }, [isDark, playToggleSound, spawnParticles, setTheme]);

  // Global keyboard shortcut 'd' / 'D' to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") {
        return;
      }
      if ((e.key === "d" || e.key === "D") && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        handleToggle();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleToggle]);

  if (!mounted) {
    return (
      <div className={`relative inline-flex h-9 w-[76px] items-center rounded-full border border-border/40 bg-muted/30 p-1 opacity-70 ${className}`}>
        <div className="h-7 w-7 rounded-full bg-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center gap-2 ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode (Shortcut: Press D)`}
        title={`Toggle Theme [D] — Currently ${isDark ? "Dark" : "Light"}`}
        onClick={handleToggle}
        className={`group relative inline-flex h-9 w-[78px] shrink-0 cursor-pointer select-none items-center rounded-full border p-1 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          isDark
            ? "border-[#133d5c] bg-gradient-to-r from-[#030e17] via-[#071c2c] to-[#04121d] shadow-[0_0_15px_rgba(0,210,247,0.15)] hover:border-[#00d2f7]/50 hover:shadow-[0_0_20px_rgba(0,210,247,0.3)]"
            : "border-[#c7dce3] bg-gradient-to-r from-[#e0f2fe] via-[#f0f9ff] to-[#fef3c7] shadow-[0_0_12px_rgba(245,158,11,0.15)] hover:border-[#00a9c7] hover:shadow-[0_0_18px_rgba(0,169,199,0.25)]"
        }`}
      >
        {/* Sky Ambient Details / Background Track */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          {/* Day details: Warm Sun Rays flare */}
          <div
            className={`absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-500 ${
              isDark ? "opacity-0 scale-50 -translate-x-3" : "opacity-100 scale-100 translate-x-0"
            }`}
          >
            <div className="h-4 w-4 rounded-full bg-amber-400/20 blur-[3px]" />
          </div>

          {/* Night details: Twinkling Constellation Stars */}
          <div
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 transition-all duration-500 ${
              isDark ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-50 translate-x-3"
            }`}
          >
            <span className="h-1 w-1 rounded-full bg-cyan-200 animate-pulse" />
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-ping opacity-75" style={{ animationDuration: "2.4s" }} />
            <span className="h-0.5 w-0.5 rounded-full bg-white opacity-80" />
          </div>
        </div>

        {/* The Celestial Slider Thumb */}
        <div
          className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${
            isDark
              ? "translate-x-[42px] bg-gradient-to-tr from-[#0284c7] via-[#00a9c7] to-[#38bdf8] text-[#030e17] shadow-[0_0_14px_rgba(0,210,247,0.75)] ring-1 ring-[#00d2f7]/80"
              : "translate-x-0 bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 text-amber-950 shadow-[0_0_12px_rgba(245,158,11,0.65)] ring-1 ring-amber-400"
          }`}
        >
          {isDark ? (
            /* Cyber Lunar Orb */
            <svg
              className="h-4 w-4 transition-transform duration-500 rotate-0 group-hover:-rotate-12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              <circle cx="15.5" cy="8.5" r="1" fill="#030e17" opacity="0.6" />
              <circle cx="17.5" cy="12.5" r="0.75" fill="#030e17" opacity="0.4" />
            </svg>
          ) : (
            /* Solar Corona Orb */
            <svg
              className="h-4 w-4 transition-transform duration-700 rotate-0 group-hover:rotate-90 text-amber-900"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.85" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}

          {/* Micro Particle Sparks radiating outwards on toggle */}
          {particles.map((p) => (
            <span
              key={p.id}
              className="pointer-events-none absolute h-1.5 w-1.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor: p.color,
                boxShadow: `0 0 6px ${p.color}`,
                transform: `translate(${Math.cos(p.angle) * p.distance}px, ${Math.sin(p.angle) * p.distance}px) scale(0)`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      </button>

      {/* Futuristic status badge */}
      <span className="hidden font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80 xl:inline-block">
        <span
          className={`mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle transition-colors ${
            isDark ? "bg-[#00d2f7] shadow-[0_0_6px_#00d2f7]" : "bg-amber-400 shadow-[0_0_6px_#f59e0b]"
          }`}
        />
        {isDark ? "DARK" : "LIGHT"}
        <span className="ml-1 opacity-50">[D]</span>
      </span>
    </div>
  );
}
