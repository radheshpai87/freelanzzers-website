"use client";

import { useEffect, useRef, useState } from "react";
import { Move3d, Compass } from "lucide-react";

type Dot = {
  id: number;
  lat: number;
  lon: number;
  size: number;
  phase: number;
  isSignal: boolean;
  name: string;
};

type Arc = {
  fromIndex: number;
  toIndex: number;
  speed: number;
  offset: number;
};

export function ParallaxField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeTelemetry, setActiveTelemetry] = useState<{
    name: string;
    coords: string;
    isSignal: boolean;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !container) return;

    let frame = 0;
    let scrollY = 0;
    const dots: Dot[] = [];
    const latitudes = 28;
    const longitudes = 52;
    let dotIdCounter = 0;

    const regions = [
      "COS HUB ALPHA",
      "DELIVERY LOCK 01",
      "REGIONAL GATEWAY",
      "TRANSACTION NODE",
      "SETTLEMENT BEACON",
      "EDGE DISCOVERY",
      "COMMERCE MESH",
      "REVENUE PIPELINE",
      "LOCAL ROUTER",
      "SYNC RELAY",
    ];

    for (let latIndex = 1; latIndex < latitudes; latIndex += 1) {
      const latitude = Math.PI * (latIndex / latitudes - 0.5);
      const longitudeOffset = latIndex % 2 ? 0.07 : 0;
      for (let lonIndex = 0; lonIndex < longitudes; lonIndex += 1) {
        // ~3.2% of dots are subtle selective orange beacon nodes
        const isSignal = (latIndex * 13 + lonIndex * 7) % 31 === 0;
        const regionName = isSignal
          ? regions[(latIndex + lonIndex) % regions.length]
          : `NODE-${latIndex.toString(16).toUpperCase()}:${lonIndex.toString(16).toUpperCase()}`;

        dots.push({
          id: dotIdCounter++,
          lat: latitude,
          lon: (lonIndex / longitudes) * Math.PI * 2 + longitudeOffset,
          size: isSignal ? 3.5 : lonIndex % 9 === 0 ? 3.8 : lonIndex % 4 === 0 ? 2.8 : 1.8,
          phase: (latIndex * longitudes + lonIndex) * 0.37,
          isSignal,
          name: regionName,
        });
      }
    }

    // Connect a few subtle arcs between beacon nodes
    const signalDotIndices = dots
      .map((d, i) => (d.isSignal ? i : -1))
      .filter((i) => i !== -1);
    const arcs: Arc[] = [];
    for (let i = 0; i < Math.min(signalDotIndices.length - 1, 8); i++) {
      arcs.push({
        fromIndex: signalDotIndices[i],
        toIndex: signalDotIndices[(i + 2) % signalDotIndices.length],
        speed: 0.0006 + (i % 3) * 0.0003,
        offset: i * 0.23,
      });
    }

    // Drag & Physics State
    let isDragging = false;
    let pointerX = -9999;
    let pointerY = -9999;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let manualYaw = 0;
    let manualPitch = 0;
    let velYaw = 0;
    let velPitch = 0;
    let hoveredDot: { dot: Dot; x: number; y: number; depth: number } | null = null;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * dpr);
      canvas.height = Math.round(bounds.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Pointer Event Listeners for Drag and Hover
    const onPointerDown = (e: PointerEvent) => {
      // Only initiate drag if within interaction area or right side
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Allow dragging from canvas
      isDragging = true;
      lastPointerX = clientX;
      lastPointerY = clientY;
      velYaw = 0;
      velPitch = 0;
      setHasInteracted(true);
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        // ignore fallback
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;

      if (isDragging) {
        const dx = pointerX - lastPointerX;
        const dy = pointerY - lastPointerY;

        manualYaw += dx * 0.006;
        manualPitch = Math.max(-0.85, Math.min(0.85, manualPitch + dy * 0.005));

        velYaw = dx * 0.006;
        velPitch = dy * 0.005;

        lastPointerX = pointerX;
        lastPointerY = pointerY;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (isDragging) {
        isDragging = false;
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {
          // ignore fallback
        }
      }
    };

    const onPointerLeave = () => {
      isDragging = false;
      pointerX = -9999;
      pointerY = -9999;
      hoveredDot = null;
      setActiveTelemetry(null);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const draw = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

      // Background subtle grid lines
      context.strokeStyle = isDark ? "rgba(43, 181, 214, 0.08)" : "rgba(13, 41, 66, 0.06)";
      context.lineWidth = 1;
      for (let x = 0; x < width; x += 112) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = 0; y < height; y += 112) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      // Physics deceleration when not dragging
      if (!isDragging) {
        manualYaw += velYaw;
        manualPitch = Math.max(-0.85, Math.min(0.85, manualPitch + velPitch));
        velYaw *= 0.94;
        velPitch *= 0.92;
        if (Math.abs(velYaw) < 0.00005) velYaw = 0;
        if (Math.abs(velPitch) < 0.00005) velPitch = 0;
      }

      const isMobile = width < 1024;
      const progress = scrollY * 0.00016;
      const ambientYaw = (time * 0.00065 + progress) % (Math.PI * 2);
      const totalYaw = ambientYaw + manualYaw;

      const basePitch = Math.sin(time * 0.00022) * 0.18;
      const totalPitch = Math.max(-0.88, Math.min(0.88, basePitch + manualPitch));
      const roll = Math.cos(time * 0.00016) * 0.06;

      const radius = Math.min(width * (isMobile ? 0.38 : 0.24), height * 0.32, 280);
      const centerX = isMobile ? width * 0.5 : width * 0.73;
      const centerY = height * 0.5 - scrollY * 0.004;

      // Outer interactive proximity ring & glow
      const distFromCenter = Math.hypot(pointerX - centerX, pointerY - centerY);
      const isPointerNearGlobe = distFromCenter <= radius * 1.25;

      // Ambient globe halo
      const haloGrad = context.createRadialGradient(
        centerX,
        centerY,
        radius * 0.5,
        centerX,
        centerY,
        radius * 1.15
      );
      if (isDark) {
        haloGrad.addColorStop(0, "rgba(43, 181, 214, 0.05)");
        haloGrad.addColorStop(0.7, "rgba(23, 111, 166, 0.03)");
        haloGrad.addColorStop(1, "rgba(13, 41, 66, 0)");
      } else {
        haloGrad.addColorStop(0, "rgba(43, 181, 214, 0.07)");
        haloGrad.addColorStop(0.7, "rgba(23, 111, 166, 0.03)");
        haloGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      }
      context.fillStyle = haloGrad;
      context.beginPath();
      context.arc(centerX, centerY, radius * 1.15, 0, Math.PI * 2);
      context.fill();

      // Track projected 3D coordinates for all dots
      type ProjectedDot = {
        dot: Dot;
        x: number;
        y: number;
        depth: number;
        opacity: number;
        heightScale: number;
      };

      const projected: ProjectedDot[] = [];
      let closestDot: ProjectedDot | null = null;
      let closestDist = 26; // hover radius in px

      for (const dot of dots) {
        const cosLat = Math.cos(dot.lat);
        const longitude = dot.lon + totalYaw;
        const rawX = Math.cos(longitude) * cosLat;
        const rawY = Math.sin(dot.lat);
        const rawZ = Math.sin(longitude) * cosLat;

        const pitchedY = rawY * Math.cos(totalPitch) - rawZ * Math.sin(totalPitch);
        const depth = rawZ * Math.cos(totalPitch) + rawY * Math.sin(totalPitch);

        const x3d = rawX * Math.cos(roll) - pitchedY * Math.sin(roll);
        const y3d = rawX * Math.sin(roll) + pitchedY * Math.cos(roll);

        const x = centerX + x3d * radius;
        const y = centerY + y3d * radius;

        const shimmer = 0.84 + Math.sin(time * 0.002 + dot.phase) * 0.16;
        const opacity = (0.58 + Math.max(0, depth) * 0.42) * shimmer;

        if (opacity < 0.1) continue;

        const heightScale = depth > 0.45 ? 1.8 : 1;
        const projItem: ProjectedDot = { dot, x, y, depth, opacity, heightScale };
        projected.push(projItem);

        // Detect hover on front-facing nodes
        if (depth > 0.25 && isPointerNearGlobe) {
          const d = Math.hypot(pointerX - x, pointerY - y);
          if (d < closestDist) {
            closestDist = d;
            closestDot = projItem;
          }
        }
      }

      // Draw subtle routing network arcs between active beacon nodes
      for (const arc of arcs) {
        const p1 = projected.find((p) => p.dot.id === dots[arc.fromIndex]?.id);
        const p2 = projected.find((p) => p.dot.id === dots[arc.toIndex]?.id);

        if (p1 && p2 && p1.depth > 0.05 && p2.depth > 0.05) {
          const midX = (p1.x + p2.x) / 2 + (p1.y - p2.y) * 0.18;
          const midY = (p1.y + p2.y) / 2 + (p2.x - p1.x) * 0.18;
          const arcAlpha = Math.min(p1.opacity, p2.opacity) * 0.35;

          context.beginPath();
          context.moveTo(p1.x, p1.y);
          context.quadraticCurveTo(midX, midY, p2.x, p2.y);
          context.strokeStyle = isDark
            ? `rgba(43, 181, 214, ${arcAlpha})`
            : `rgba(23, 111, 166, ${arcAlpha * 0.85})`;
          context.lineWidth = 1;
          context.setLineDash([3, 4]);
          context.stroke();
          context.setLineDash([]);

          // Dynamic photon packet traveling along arc
          const t = (time * arc.speed + arc.offset) % 1;
          const photonX = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * midX + t * t * p2.x;
          const photonY = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * midY + t * t * p2.y;

          context.beginPath();
          context.arc(photonX, photonY, 2.2, 0, Math.PI * 2);
          context.fillStyle = isDark ? "rgba(245, 138, 36, 0.9)" : "rgba(235, 125, 20, 0.85)";
          context.fill();
        }
      }

      // Render dots
      for (const item of projected) {
        const { dot, x, y, depth, opacity, heightScale } = item;
        const isHovered = closestDot?.dot.id === dot.id;

        if (dot.isSignal) {
          // Subtle Selective Orange beacon node (~3.2% of nodes)
          if (depth > 0.4) {
            context.fillStyle = isDark
              ? `rgba(245, 138, 36, ${opacity * 0.24})`
              : `rgba(235, 125, 20, ${opacity * 0.20})`;
            context.fillRect(
              Math.round(x) - 1,
              Math.round(y) - 1,
              dot.size + 2,
              dot.size * heightScale + 2
            );
          }
          context.fillStyle = isDark
            ? `rgba(245, 138, 36, ${opacity * 0.96})`
            : `rgba(235, 125, 20, ${opacity * 0.94})`;
        } else {
          // Core Digital Blue / Signal Cyan nodes
          context.fillStyle = isDark
            ? `rgba(43, 181, 214, ${opacity * 0.95})`
            : `rgba(23, 111, 166, ${opacity})`;
        }

        const size = isHovered ? dot.size + 1.8 : dot.size;
        context.fillRect(Math.round(x), Math.round(y), size, size * heightScale);

        // Hover effect on active node
        if (isHovered) {
          // Glowing concentric target ring
          const ringPulse = 8 + Math.sin(time * 0.008) * 3;
          context.beginPath();
          context.arc(x + size / 2, y + size / 2, ringPulse, 0, Math.PI * 2);
          context.strokeStyle = dot.isSignal
            ? "rgba(245, 138, 36, 0.85)"
            : "rgba(43, 181, 214, 0.9)";
          context.lineWidth = 1.2;
          context.stroke();

          // Outer ping wave
          const wavePulse = 14 + (time * 0.02 % 10);
          const waveAlpha = Math.max(0, 1 - (wavePulse - 14) / 10);
          context.beginPath();
          context.arc(x + size / 2, y + size / 2, wavePulse, 0, Math.PI * 2);
          context.strokeStyle = dot.isSignal
            ? `rgba(245, 138, 36, ${waveAlpha * 0.5})`
            : `rgba(43, 181, 214, ${waveAlpha * 0.5})`;
          context.stroke();
        }
      }

      // Update hovered dot telemetry for HUD
      if (closestDot) {
        hoveredDot = closestDot;
        const latDeg = ((closestDot.dot.lat * 180) / Math.PI).toFixed(1);
        const lonDeg = (((closestDot.dot.lon % (Math.PI * 2)) * 180) / Math.PI).toFixed(1);
        setActiveTelemetry({
          name: closestDot.dot.name,
          coords: `${latDeg}°N, ${lonDeg}°E`,
          isSignal: closestDot.dot.isSignal,
        });

        // Floating HUD card drawn on canvas beside hovered node
        const cardX = Math.min(closestDot.x + 14, width - 180);
        const cardY = Math.max(closestDot.y - 38, 20);
        const cardW = 168;
        const cardH = 46;

        context.fillStyle = isDark ? "rgba(13, 41, 66, 0.88)" : "rgba(255, 255, 255, 0.94)";
        context.strokeStyle = closestDot.dot.isSignal
          ? "rgba(245, 138, 36, 0.7)"
          : "rgba(43, 181, 214, 0.5)";
        context.lineWidth = 1;
        context.beginPath();
        context.roundRect(cardX, cardY, cardW, cardH, 4);
        context.fill();
        context.stroke();

        // Crosshair link line
        context.beginPath();
        context.moveTo(closestDot.x, closestDot.y);
        context.lineTo(cardX, cardY + cardH / 2);
        context.strokeStyle = closestDot.dot.isSignal
          ? "rgba(245, 138, 36, 0.45)"
          : "rgba(43, 181, 214, 0.4)";
        context.stroke();

        // Card typography
        context.font = "600 9px monospace";
        context.fillStyle = closestDot.dot.isSignal
          ? (isDark ? "#f58a24" : "#eb7d14")
          : (isDark ? "#2bb5d6" : "#176fa6");
        context.fillText(
          closestDot.dot.isSignal ? "● BEACON // DELIVERY LOCK" : "● COS EDGE RELAY",
          cardX + 8,
          cardY + 14
        );

        context.font = "500 10px monospace";
        context.fillStyle = isDark ? "#ffffff" : "#0d2942";
        context.fillText(closestDot.dot.name, cardX + 8, cardY + 28);

        context.font = "400 8.5px monospace";
        context.fillStyle = isDark ? "rgba(255, 255, 255, 0.55)" : "rgba(13, 41, 66, 0.65)";
        context.fillText(
          `${((closestDot.dot.lat * 180) / Math.PI).toFixed(0)}°N / ${(((closestDot.dot.lon % (Math.PI * 2)) * 180) / Math.PI).toFixed(0)}°E · SYNC 99.98%`,
          cardX + 8,
          cardY + 39
        );
      } else {
        hoveredDot = null;
        setActiveTelemetry(null);
      }

      frame = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        aria-label="Interactive 3D Commercial Operating System Network Globe"
        className="h-full w-full max-w-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Floating Interactive HUD hint */}
      <div className="pointer-events-none absolute bottom-6 right-6 hidden items-center gap-3 rounded-full border border-border/60 bg-background/80 px-4 py-2 font-mono text-xs text-muted-foreground shadow-lg backdrop-blur-md transition-opacity duration-500 lg:flex">
        <span className="flex h-2 w-2 relative">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <div className="flex items-center gap-2">
          <Move3d className="h-3.5 w-3.5 text-primary" />
          <span>
            {hasInteracted ? "3D MESH ACTIVE · DRAG TO SPIN" : "DRAG GLOBE TO ROTATE"}
          </span>
        </div>
        <span className="h-3 w-px bg-border/60" />
        <div className="flex items-center gap-1.5 text-[11px] text-foreground/80">
          <Compass className="h-3 w-3 text-muted-foreground" />
          <span>10-LOCK NETWORK</span>
        </div>
      </div>
    </div>
  );
}