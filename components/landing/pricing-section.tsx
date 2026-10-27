import { ArrowRight, Check } from "lucide-react";

const plans = [{ name: "WhatsApp Cash Engine", price: "₹18k–₹25k", margin: "85%+ gross margin target", desc: "Recover missed demand and bring orders direct.", features: ["WhatsApp Cloud bot", "Dynamic counter QR", "Missed-call auto-capture", "Broadcast re-engagement"] }, { name: "Full Triad Retail OS", price: "₹40k–₹60k", margin: "75–80% gross margin target", desc: "The complete discovery-to-retention system.", features: ["Everything in Cash Engine", "5-km Google Maps pack", "Next.js storefront", "UPI bill-split engine"], featured: true }, { name: "Enterprise Commerce Suite", price: "₹75k+", margin: "₹10k / month AMC", desc: "Deep infrastructure for high-volume operators.", features: ["Everything in Retail OS", "In-store tablet kiosk", "Real-time inventory sync", "Dedicated monthly AMC"] }];

export function PricingSection() {
  return (
    <section id="pricing" className="py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-20 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[.24em] text-[#f58a24]">
              <span className="h-px w-10 bg-[#f58a24]" />
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
                <>
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2bb5d6] via-[#f58a24] to-[#2bb5d6]" />
                  <div className="absolute -top-3.5 left-8 flex items-center gap-2 rounded-full border border-[#f58a24]/60 bg-[#071a2b] px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#f58a24] shadow-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f58a24] shadow-[0_0_8px_rgba(245,138,36,0.9)] animate-pulse" />
                    Recommended
                  </div>
                </>
              )}
              <div className="mb-10 flex items-start justify-between">
                <span className="font-mono text-xs opacity-60">0{i + 1}</span>
                <span className={`font-mono text-xs uppercase ${plan.featured ? "text-[#f58a24] font-medium" : "opacity-70"}`}>
                  {plan.margin}
                </span>
              </div>
              <h3 className="max-w-xs text-3xl tracking-tight">{plan.name}</h3>
              <p className="mt-4 min-h-12 text-sm opacity-70">{plan.desc}</p>
              <div className="my-8 border-y border-current/15 py-6 text-4xl tracking-tight">{plan.price}</div>
              <ul className="mb-10 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm opacity-85">
                    <Check className={`h-4 w-4 shrink-0 ${plan.featured ? "text-[#f58a24]" : "text-[#2bb5d6]"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-auto flex items-center justify-between border px-4 py-3 text-sm font-semibold transition-all ${
                  plan.featured
                    ? "border-[#2bb5d6] bg-[#2bb5d6] text-[#0d2942] hover:bg-[#34c4e6] hover:shadow-[0_0_15px_rgba(43,181,214,0.35)]"
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
