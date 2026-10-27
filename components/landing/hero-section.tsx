"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ParallaxField } from "@/components/landing/parallax-field";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden border-b border-border bg-background">
      <ParallaxField />
      <div className="pointer-events-none relative z-20 mx-auto grid min-h-[760px] max-w-[1400px] items-center gap-10 px-6 py-24 lg:grid-cols-[1.1fr_.9fr] lg:px-12">
        <div className="pointer-events-auto">
          <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f58a24] shadow-[0_0_8px_rgba(245,138,36,0.7)]" />
            <span className="h-px w-8 bg-primary/40" />
            Commercial infrastructure for local business
          </div>
          <h1 className="max-w-4xl text-[clamp(3.5rem,8vw,8.5rem)] leading-[.86] tracking-[-.07em]">Your business,<br /><span className="text-primary">always open.</span></h1>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground">We don&apos;t build static websites that get lost on the internet. We install a Commercial Operating System that captures discovery, converts intent, and automates repeat revenue.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#pricing"
              className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-1 hover:bg-[#34c4e6] hover:shadow-[0_0_24px_rgba(43,181,214,0.4)]"
            >
              Install your COS <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center gap-3 border border-border px-6 py-4 text-sm transition-colors hover:border-primary hover:text-primary"
            >
              See how it works
            </a>
          </div>
          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f58a24]" />
              10-transaction delivery lock
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Built for regional growth
            </span>
          </div>
        </div>
        <div className="relative hidden h-full min-h-[420px] lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}
