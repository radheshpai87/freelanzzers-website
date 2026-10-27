import { MapPin, MessageCircle, ScanLine } from "lucide-react";

const engines = [
  { icon: MapPin, index: "01", title: "Discovery Engine", detail: "Google Maps · 5 km catchment", copy: "Own the local search moment before a customer ever reaches your storefront." },
  { icon: ScanLine, index: "02", title: "Conversion Engine", detail: "QR storefront · UPI checkout", copy: "Turn intent into a fast, measurable purchase path across every touchpoint." },
  { icon: MessageCircle, index: "03", title: "Retention Engine", detail: "WhatsApp re-orders · recalls", copy: "Keep the relationship active with timely re-orders, recalls, and repeat revenue." },
];

export function TriadArchitectureSection() {
  return (
    <section id="architecture" className="relative overflow-hidden border-b border-border bg-card py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-12">
        <div className="self-center">
          <div className="mb-7 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-primary"><span className="h-px w-10 bg-primary" />The operating system</div>
          <h2 className="max-w-xl text-5xl leading-[.94] tracking-[-.06em] md:text-7xl">One system.<br /><span className="text-primary">Three engines.</span></h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">Triad Commerce Architecture connects discovery, conversion, and retention into one continuous growth loop for local businesses.</p>
        </div>
        <div className="relative border border-primary/40 bg-background/95 p-5 shadow-xl shadow-primary/5 backdrop-blur-sm md:p-8">
          <div className="mb-6 flex items-center justify-between border-b border-border pb-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"><span>Triad Commerce Architecture</span><span className="text-primary">● live system</span></div>
          <div className="space-y-3">
            {engines.map(({ icon: Icon, index, title, detail, copy }) => <article key={title} className="grid gap-4 border border-border bg-card p-5 md:grid-cols-[52px_1fr_40px] md:items-center"><div className="grid h-12 w-12 place-items-center border border-primary/30 text-primary"><Icon className="h-5 w-5" /></div><div><h3 className="text-lg font-medium">{title}</h3><div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-primary/80">{detail}</div><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p></div><span className="font-mono text-xs text-primary md:text-right">{index}</span></article>)}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5 text-center"><div><div className="text-2xl">10</div><div className="font-mono text-[9px] uppercase text-muted-foreground">transactions</div></div><div><div className="text-2xl">24/7</div><div className="font-mono text-[9px] uppercase text-muted-foreground">automation</div></div><div><div className="text-2xl text-primary">UPI</div><div className="font-mono text-[9px] uppercase text-muted-foreground">ready</div></div></div>
        </div>
      </div>
    </section>
  );
}
