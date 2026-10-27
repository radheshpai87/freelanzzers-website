"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Architecture", href: "#architecture" },
  { name: "Promise", href: "#promise" },
  { name: "Pricing", href: "#pricing" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-4 transition-all duration-300 ${isScrolled ? "pt-4" : "pt-0"}`}>
      <nav className={`mx-auto max-w-[1400px] border-[#c7dce3] transition-all ${isScrolled || isMobileMenuOpen ? "rounded-full border bg-[#eef7fa]/90 shadow-2xl shadow-black/20 backdrop-blur-xl" : "border-b bg-[#eef7fa]/85 backdrop-blur-md"}`}>
        <div className={`flex items-center justify-between px-6 lg:px-8 ${isScrolled ? "h-14" : "h-20"}`}>
          <a href="#" className="flex items-center gap-2" aria-label="FreeLanZZers home"><span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-transparent"><img src="/freelanzzers-emblem-dark.png" alt="FreeLanZZers logo" className="h-full w-full object-contain mix-blend-multiply" /></span><span className="font-display text-xl tracking-tight text-[#062238]">FreeLanZZers</span><span className="font-mono text-[10px] text-[#00a9c7]">TM</span></a>
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => <a key={link.name} href={link.href} className="text-sm text-[#496b7c] transition-colors hover:text-[#00a9c7]">{link.name}</a>)}
          </div>
          <div className="hidden items-center gap-5 md:flex"><a href="#" className="text-sm text-[#496b7c] hover:text-[#062238]">Sign in</a><Button size="sm" className="rounded-full bg-[#00a9c7] px-5 text-[#eef7fa] hover:bg-[#52d4e8]">Start a system</Button></div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#00a9c7] md:hidden" aria-label="Toggle menu">{isMobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
        {isMobileMenuOpen && <div className="border-t border-[#c7dce3] px-6 py-8 md:hidden"><div className="flex flex-col gap-6">{navLinks.map((link) => <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-3xl text-[#062238]">{link.name}</a>)}<Button className="mt-4 rounded-full bg-[#00a9c7] text-[#eef7fa]">Start a system</Button></div></div>}
      </nav>
    </header>
  );
}
