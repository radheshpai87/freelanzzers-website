import { ArrowRight, Check } from "lucide-react";

const plans = [{ name: "WhatsApp Cash Engine", price: "₹18k–₹25k", margin: "85%+ gross margin target", desc: "Recover missed demand and bring orders direct.", features: ["WhatsApp Cloud bot", "Dynamic counter QR", "Missed-call auto-capture", "Broadcast re-engagement"] }, { name: "Full Triad Retail OS", price: "₹40k–₹60k", margin: "75–80% gross margin target", desc: "The complete discovery-to-retention system.", features: ["Everything in Cash Engine", "5-km Google Maps pack", "Next.js storefront", "UPI bill-split engine"], featured: true }, { name: "Enterprise Commerce Suite", price: "₹75k+", margin: "₹10k / month AMC", desc: "Deep infrastructure for high-volume operators.", features: ["Everything in Retail OS", "In-store tablet kiosk", "Real-time inventory sync", "Dedicated monthly AMC"] }];

export function PricingSection() {
  return (
    <section id="pricing" className="py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-20 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[.24em] text-primary">
              <span className="h-px w-10 bg-primary" />
              Install the infrastructure
            </div>
            <h2 className="text-6xl leading-[.9] tracking-[-.06em] lg:text-8xl">
              Pay when it<br />
              <span className="text-muted-foreground">proves itself.</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Every deployment starts with a 50% setup advance. The remaining 50% is due only after 10 verified live transactions.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <article
              key={plan.name}
              className={`relative flex flex-col border p-8 transition-colors lg:p-10 ${
                plan.featured
                  ? "border-[#2bb5d6] bg-[#0d2942] text-[#eaf4f8] shadow-2xl shadow-[#0d2942]/20 dark:shadow-cyan-950/50"
                  : "border-border bg-card text-card-foreground"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-8 flex items-center gap-1.5 border border-[#176fa6]/50 bg-[#071a2b] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#eaf4f8] shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f58a24] shadow-[0_0_6px_rgba(245,138,36,0.8)] animate-pulse" />
                  Recommended
                </div>
              )}
              <div className="mb-10 flex items-start justify-between">
                <span className="font-mono text-xs opacity-60">0{i + 1}</span>
                <span className="font-mono text-xs uppercase opacity-70">{plan.margin}</span>
              </div>
              <h3 className="max-w-xs text-3xl tracking-tight">{plan.name}</h3>
              <p className="mt-4 min-h-12 text-sm opacity-70">{plan.desc}</p>
              <div className="my-8 border-y border-current/15 py-6 text-4xl tracking-tight">{plan.price}</div>
              <ul className="mb-10 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm opacity-85">
                    <Check className="h-4 w-4 shrink-0 text-[#2bb5d6]" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-auto flex items-center justify-between border px-4 py-3 text-sm font-semibold transition-all ${
                  plan.featured
                    ? "border-[#ffa24c] bg-[#ffa24c] text-[#0d2942] hover:bg-[#ffb36d] hover:shadow-[0_0_18px_rgba(255,162,76,0.4)]"
                    : "border-border hover:border-primary hover:text-primary"
                }`}
              >
                Build my system <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
