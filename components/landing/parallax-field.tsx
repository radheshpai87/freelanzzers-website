"use client";

import { useEffect, useRef } from "react";

type Dot = { lat: number; lon: number; size: number; phase: number };

export function ParallaxField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frame = 0;
    let scrollY = 0;
    const dots: Dot[] = [];
    const latitudes = 26;
    const longitudes = 48;

    for (let latIndex = 1; latIndex < latitudes; latIndex += 1) {
      const latitude = Math.PI * (latIndex / latitudes - 0.5);
      const longitudeOffset = latIndex % 2 ? 0.08 : 0;
      for (let lonIndex = 0; lonIndex < longitudes; lonIndex += 1) {
        dots.push({
          lat: latitude,
          lon: (lonIndex / longitudes) * Math.PI * 2 + longitudeOffset,
          size: lonIndex % 9 === 0 ? 4 : lonIndex % 4 === 0 ? 3 : 2,
          phase: (latIndex * longitudes + lonIndex) * 0.37,
        });
      }
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * dpr);
      canvas.height = Math.round(bounds.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

      context.strokeStyle = isDark ? "rgba(0, 210, 247, 0.08)" : "rgba(6, 34, 56, 0.08)";
      context.lineWidth = 1;
      for (let x = 0; x < width; x += 112) {
        context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke();
      }
      for (let y = 0; y < height; y += 112) {
        context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke();
      }

      const progress = scrollY * 0.00016;
      const yaw = (time * 0.00068 + progress) % (Math.PI * 2);
      const pitch = Math.sin(time * 0.00023) * 0.24 + Math.sin(time * 0.00011) * 0.1;
      const roll = Math.cos(time * 0.00017) * 0.08;
      const radius = Math.min(width * 0.23, height * 0.30, 270);
      const centerX = width * 0.73;
      const centerY = height * 0.5 - scrollY * 0.004;

      for (const dot of dots) {
        const cosLat = Math.cos(dot.lat);
        const longitude = dot.lon + yaw;
        const rawX = Math.cos(longitude) * cosLat;
        const rawY = Math.sin(dot.lat);
        const rawZ = Math.sin(longitude) * cosLat;
        const pitchedY = rawY * Math.cos(pitch) - rawZ * Math.sin(pitch);
        const depth = rawZ * Math.cos(pitch) + rawY * Math.sin(pitch);
        const x3d = rawX * Math.cos(roll) - pitchedY * Math.sin(roll);
        const y3d = rawX * Math.sin(roll) + pitchedY * Math.cos(roll);
        const x = centerX + x3d * radius;
        const y = centerY + y3d * radius;
        const shimmer = 0.84 + Math.sin(time * 0.002 + dot.phase) * 0.16;
        const opacity = (0.58 + Math.max(0, depth) * 0.42) * shimmer;
        if (opacity < 0.1) continue;

        context.fillStyle = isDark
          ? `rgba(0, 210, 247, ${opacity * 0.95})`
          : `rgba(0, 137, 220, ${opacity})`;
        const heightScale = depth > 0.45 ? 1.8 : 1;
        context.fillRect(Math.round(x), Math.round(y), dot.size, dot.size * heightScale);
      }

      frame = requestAnimationFrame(draw);
    };

    const onScroll = () => { scrollY = window.scrollY; };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 h-full w-full max-w-full overflow-hidden opacity-90" />;
}
