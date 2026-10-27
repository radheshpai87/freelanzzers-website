"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#062238] py-24 text-[#f7fbfc] lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className={`relative overflow-hidden border border-[#2b5970] bg-[#0a2d45] transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(185,239,65,0.16),transparent_34%)]" />
          <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 border-b border-l border-[#2b5970]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-36 w-36 border-r border-t border-[#2b5970]" />
          <div className="relative z-10 grid gap-16 px-8 py-16 lg:grid-cols-[1fr_0.7fr] lg:px-16 lg:py-24">
            <div>
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.28em] text-[#52d4e8]">Commercial operating system</p>
              <h2 className="max-w-3xl text-5xl font-medium leading-[0.9] tracking-[-0.055em] md:text-7xl lg:text-[86px]">
                Turn nearby demand into repeat revenue.
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#b7d0d8]">
                FreeLanZZers connects local businesses to the customers already looking for them — then keeps the conversation moving.
              </p>
              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
                <Button size="lg" className="h-14 rounded-full bg-[#52d4e8] px-8 text-base text-[#062238] hover:bg-[#8ce8f5]">
                  Start building your system <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 rounded-full border-[#77a7b8] bg-transparent px-8 text-base text-[#f7fbfc] hover:bg-[#16445c] hover:text-[#f7fbfc]">
                  Talk to our team
                </Button>
              </div>
            </div>
            <div className="flex items-end lg:justify-end">
              <div className="w-full max-w-sm border-l border-[#52d4e8] pl-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#52d4e8]">The promise</p>
                <p className="mt-5 text-2xl leading-tight text-[#f7fbfc]">Discovery becomes a verified conversation. A conversation becomes a customer.</p>
                <p className="mt-8 font-mono text-xs text-[#91b0bb]">BUILT FOR LOCAL COMMERCE / 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
