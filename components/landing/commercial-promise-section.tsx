import { ShieldCheck, Sparkles, Workflow } from "lucide-react";

export function CommercialPromiseSection() {
  return (
    <section id="promise" className="border-y border-[#176fa6]/30 bg-[#0d2942] py-24 text-[#eaf4f8]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <div className="mb-6 font-mono text-xs uppercase tracking-[.24em] text-[#2bb5d6]">
              Why FreeLanZZers
            </div>
            <h2 className="text-5xl leading-[.9] tracking-[-.05em] lg:text-7xl">
              Infrastructure,<br />not agency labor.
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "10-transaction lock", text: "Milestone-based delivery reduces implementation risk." },
              { icon: Workflow, title: "End-to-end cash capture", text: "Track the lifecycle from Maps discovery to follow-up." },
              { icon: Sparkles, title: "SaaS gateway", text: "Start small, then expand into automation modules." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="border-l border-[#176fa6]/50 pl-5">
                <Icon className="mb-6 h-6 w-6 text-[#2bb5d6]" />
                <h3 className="font-medium text-[#eaf4f8]">{title}</h3>
                <p className="mt-3 text-sm text-[#b5d2e0]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
