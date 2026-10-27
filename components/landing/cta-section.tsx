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
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0d2942] dark:bg-[#071a2b] py-24 text-[#eaf4f8] lg:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className={`relative overflow-hidden border border-[#176fa6]/40 bg-[#0a2238] dark:bg-[#091e30] transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(43,181,214,0.18),transparent_40%),radial-gradient(circle_at_15%_85%,rgba(245,138,36,0.12),transparent_35%)]" />
          <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 border-b border-l border-[#176fa6]/40" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-36 w-36 border-r border-t border-[#176fa6]/40" />
          <div className="relative z-10 grid gap-16 px-8 py-16 lg:grid-cols-[1fr_0.7fr] lg:px-16 lg:py-24">
            <div>
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.28em] text-[#f58a24] flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f58a24] shadow-[0_0_8px_rgba(245,138,36,0.8)]" />
                Commercial operating system
              </p>
              <h2 className="max-w-3xl text-5xl font-medium leading-[0.9] tracking-[-0.055em] md:text-7xl lg:text-[86px]">
                Turn nearby demand into repeat revenue.
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#b5d2e0]">
                FreeLanZZers connects local businesses to the customers already looking for them — then keeps the conversation moving.
              </p>
              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
                <Button size="lg" className="h-14 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-[#34c4e6] shadow-[0_0_24px_rgba(43,181,214,0.4)] transition-all">
                  Start building your system <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 rounded-full border-[#f58a24]/50 bg-transparent px-8 text-base text-[#eaf4f8] hover:border-[#f58a24] hover:bg-[#f58a24]/10 hover:text-[#f58a24] transition-all">
                  Talk to our team
                </Button>
              </div>
            </div>
            <div className="flex items-end lg:justify-end">
              <div className="w-full max-w-sm border-l-2 border-[#f58a24] pl-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#f58a24] flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f58a24]" />
                  The promise
                </p>
                <p className="mt-5 text-2xl leading-tight text-[#eaf4f8]">Discovery becomes a verified conversation. A conversation becomes a customer.</p>
                <p className="mt-8 font-mono text-xs text-[#8bb1c7]">BUILT FOR LOCAL COMMERCE / 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
