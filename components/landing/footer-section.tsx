"use client";

import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  System: ["Architecture", "Promise", "Pricing", "Integrations"],
  Resources: ["Documentation", "Agent SDK", "API reference", "Status"],
  Company: ["About", "Contact", "Careers"],
};

export function FooterSection() {
  return (
    <footer className="border-t border-[#c7dce3] bg-[#062238] text-[#f7fbfc]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-12 border-b border-[#c7dce3] py-16 lg:grid-cols-[1.1fr_2fr] lg:py-24">
          <div>
            <div className="mb-6 flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-transparent"><img src="/freelanzzers-emblem-dark.png" alt="FreeLanZZers logo" className="h-full w-full object-contain mix-blend-screen" /></span><p className="font-mono text-xs uppercase tracking-[0.28em] text-[#52d4e8]">FreeLanZZers Technologies</p></div>
            <h2 className="mt-6 max-w-xl text-4xl leading-[0.95] tracking-[-0.045em] md:text-6xl">The infrastructure behind local commerce.</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#b7d0d8]">A commercial operating system for businesses that want to turn local demand into verified conversations, conversions, and repeat revenue.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[#52d4e8]">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => <li key={link}><a href="#" className="text-sm text-[#d4e7eb] transition-colors hover:text-[#52d4e8]">{link}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-5 py-8 text-xs text-[#91b0bb] sm:flex-row sm:items-center">
          <p>© 2026 FreeLanZZers Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-[#52d4e8]">LinkedIn <ArrowUpRight className="ml-1 inline h-3 w-3" /></a>
            <a href="#" className="transition-colors hover:text-[#52d4e8]">X <ArrowUpRight className="ml-1 inline h-3 w-3" /></a>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#52d4e8]" /> Systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
