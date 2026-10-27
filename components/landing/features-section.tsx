import { MapPinned, ReceiptIndianRupee, Repeat2 } from "lucide-react";

const layers = [{ number: "01", icon: MapPinned, name: "Discovery Engine", text: "Own the 5-km catchment with synchronized Google Business updates, local search visibility, and review acceleration." }, { number: "02", icon: ReceiptIndianRupee, name: "Conversion Engine", text: "Turn foot traffic into completed transactions with QR storefronts, UPI deep-links, bill splitting, and service approvals." }, { number: "03", icon: Repeat2, name: "Retention Engine", text: "Reclaim margin and attention with WhatsApp ordering, missed-call recovery, and predictive customer recall loops." }];

export function FeaturesSection() {
  return (
    <section id="architecture" className="border-b border-border bg-card py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-20 grid gap-8 lg:grid-cols-[1fr_.7fr]">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[.24em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f58a24] shadow-[0_0_6px_rgba(245,138,36,0.6)]" />
              <span className="h-px w-8 bg-primary/40" />
              The platform
            </div>
            <h2 className="max-w-3xl text-6xl leading-[.9] tracking-[-.06em] lg:text-8xl">
              One system.<br />
              <span className="text-muted-foreground">Three engines.</span>
            </h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-muted-foreground">
            The Triad Commerce Architecture moves customers through the complete commercial lifecycle—from being found to coming back.
          </p>
        </div>
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {layers.map(({ number, icon: Icon, name, text }) => (
            <article
              key={name}
              className="group bg-background p-8 transition-colors hover:bg-primary hover:text-primary-foreground lg:p-10"
            >
              <div className="mb-16 flex items-start justify-between">
                <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground group-hover:text-primary-foreground/75">
                  <span className="h-1 w-1 rounded-full bg-[#f58a24] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {number}
                </span>
              </div>
              <h3 className="text-3xl tracking-tight">{name}</h3>
              <p className="mt-5 leading-relaxed text-muted-foreground group-hover:text-primary-foreground/80">
                {text}
              </p>
              <div className="mt-12 h-px w-12 bg-primary transition-colors duration-300 group-hover:bg-[#f58a24]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
