"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
      <nav
        className={`mx-auto max-w-[1400px] border-border transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "rounded-full border bg-background/90 shadow-2xl shadow-black/10 dark:shadow-cyan-950/30 backdrop-blur-xl"
            : "border-b bg-background/80 backdrop-blur-md"
        }`}
      >
        <div className={`flex items-center justify-between px-6 lg:px-8 ${isScrolled ? "h-14" : "h-20"}`}>
          <a href="#" className="flex items-center gap-2" aria-label="FreeLanZZers home">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-transparent">
              <img
                src="/freelanzzers-emblem-dark.png"
                alt="FreeLanZZers logo"
                className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-screen dark:brightness-125 dark:filter dark:drop-shadow-[0_0_8px_rgba(0,210,247,0.5)] transition-all duration-300"
              />
            </span>
            <span className="font-display text-xl tracking-tight text-foreground transition-colors">FreeLanZZers</span>
            <span className="font-mono text-[10px] text-primary">TM</span>
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <ThemeToggle />
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Sign in
            </a>
            <Button
              size="sm"
              className="rounded-full bg-primary px-5 text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(0,169,199,0.35)]"
            >
              Start a system
            </Button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-border px-6 py-8 md:hidden">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-3xl text-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Start a system
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
