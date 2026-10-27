"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useTheme } from "next-themes";

interface Particle {
  id: number;
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

  const currentTheme = mounted ? resolvedTheme || theme : "dark";
  const isDark = currentTheme === "dark";

  // Gentle high-tech audio chime using Web Audio API
  const playToggleSound = useCallback((toDark: boolean) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
      gain.gain.setValueAtTime(0.015, now);

      if (toDark) {
        osc.type = "sine";
        osc.frequency.setValueAtTime(780, now);
        osc.frequency.exponentialRampToValueAtTime(360, now + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
      } else {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(840, now + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
      }

      osc.start(now);
      osc.stop(now + 0.15);
      setTimeout(() => ctx.close().catch(() => {}), 250);
    } catch {
      // Silently ignore if audio blocked
    }
  }, []);

  // Trigger burst particles around the thumb
  const spawnParticles = useCallback((toDark: boolean) => {
    const newParticles: Particle[] = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      angle: (i * (360 / 8)) * (Math.PI / 180),
      distance: 18 + Math.random() * 10,
      color: toDark ? "#2bb5d6" : "#f58a24",
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 500);
  }, []);

  const handleToggle = useCallback(() => {
    const nextTheme = isDark ? "light" : "dark";
    playToggleSound(!isDark);
    spawnParticles(!isDark);
    setTheme(nextTheme);
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
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode (Shortcut: Press D)`}
        title={`Toggle Theme [D] — Currently ${isDark ? "Dark" : "Light"}`}
        onClick={handleToggle}
        className="group relative inline-flex h-9 w-[76px] shrink-0 cursor-pointer select-none items-center rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {/* Layer 1: Light Mode Sky Track (smooth opacity cross-fade) */}
        <div
          className={`absolute inset-0 rounded-full border border-[#c4dce6] bg-gradient-to-r from-[#eaf4f8] via-[#f7f3e9] to-[#fcebd9] shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.08)] transition-opacity duration-500 ease-in-out ${
            isDark ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Day Ambient Cloud & Sunlight Flare */}
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-75">
            <span className="h-1.5 w-3.5 rounded-full bg-[#176fa6]/20" />
            <span className="h-1 w-2 rounded-full bg-[#176fa6]/10" />
          </div>
        </div>

        {/* Layer 2: Dark Mode Galaxy Track (smooth opacity cross-fade) */}
        <div
          className={`absolute inset-0 rounded-full border border-[#1a4366] bg-gradient-to-r from-[#061624] via-[#0d2942] to-[#071a2b] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_0_15px_rgba(43,181,214,0.18)] transition-opacity duration-500 ease-in-out ${
            isDark ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Night Constellation Twinkling Stars */}
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-90">
            <span className="h-1 w-1 rounded-full bg-[#2bb5d6] animate-pulse" />
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#2bb5d6] animate-ping opacity-60"
              style={{ animationDuration: "2.5s" }}
            />
            <span className="h-0.5 w-0.5 rounded-full bg-white opacity-80" />
          </div>
        </div>

        {/* The Celestial Slider Thumb */}
        <div
          className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-500 will-change-transform"
          style={{
            transform: isDark ? "translateX(40px)" : "translateX(0px)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Thumb Surface: Solar Gold Layer */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#f58a24] via-[#fba848] to-[#f7f3e9] shadow-[0_0_12px_rgba(245,138,36,0.65)] ring-1 ring-[#f58a24] transition-opacity duration-500 ease-in-out ${
              isDark ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Thumb Surface: Cyber Cyan Lunar Layer */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#176fa6] via-[#2bb5d6] to-[#67d5ee] shadow-[0_0_14px_rgba(43,181,214,0.75)] ring-1 ring-[#2bb5d6]/80 transition-opacity duration-500 ease-in-out ${
              isDark ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Icon: Sun (Smooth rotation, scale, and fade) */}
          <div
            className={`absolute inset-0 flex items-center justify-center text-amber-950 transition-all duration-500 ease-out ${
              isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
            }`}
          >
            <svg
              className="h-4 w-4"
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
          </div>

          {/* Icon: Moon (Smooth rotation, scale, and fade) */}
          <div
            className={`absolute inset-0 flex items-center justify-center text-[#030e17] transition-all duration-500 ease-out ${
              isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
            }`}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              <circle cx="15.5" cy="8.5" r="1" fill="#030e17" opacity="0.6" />
              <circle cx="17.5" cy="12.5" r="0.75" fill="#030e17" opacity="0.4" />
            </svg>
          </div>

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
    </div>
  );
}
