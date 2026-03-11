// templates/saas-landing/app/page.tsx
import { PricingTable } from "@cindiweb/ui";

// ─── DATA ────────────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: "⚡", title: "Sub-100ms deploys", desc: "Push to production in seconds. Rollbacks are one click. No YAML ceremonies." },
  { icon: "🔍", title: "End-to-end observability", desc: "Logs, traces, and errors in one place. Stop context-switching between dashboards." },
  { icon: "🤝", title: "Team permissions", desc: "Granular access controls with audit trails. SOC 2 ready out of the box." },
  { icon: "🔗", title: "120+ integrations", desc: "GitHub, Slack, Datadog, PagerDuty — connect the tools you already use." },
  { icon: "📈", title: "Usage analytics", desc: "Understand exactly how your product is used with no tracking scripts to install." },
  { icon: "🌍", title: "Global edge network", desc: "Deploy to 35 regions. Your API stays fast wherever your users are." },
];

const LOGOS = ["Acme Inc.", "Stellar", "NovaCorp", "Orbit", "Helix", "Meridian"];

const FAQS = [
  { q: "How long does setup take?", a: "Most teams are fully configured in under 20 minutes. We handle the infra; you keep the code." },
  { q: "Do I need a credit card to start?", a: "No. The free tier is genuinely useful — up to 3 projects, full feature access, no expiry." },
  { q: "Can I self-host Fluxr?", a: "Yes. Enterprise plans include a self-hosted option with full data residency control." },
  { q: "What happens if I exceed my plan limits?", a: "We'll notify you before anything breaks. Overages are billed at a fair per-unit rate." },
];

// Fixed: period is "mo" not "/mo" — PricingTable adds the slash automatically
const TIERS = [
  {
    name: "Starter",
    price: "Free",
    description: "For solo developers and side projects.",
    features: ["3 projects", "5GB storage", "Community support", "Basic analytics"],
    cta: "Get started",
  },
  {
    name: "Pro",
    price: "$49",
    period: "mo",  // ← "mo" not "/mo"
    description: "For growing teams shipping fast.",
    features: ["Unlimited projects", "50GB storage", "Priority support", "Full analytics", "Team permissions", "Custom domains"],
    cta: "Start free trial",
    highlighted: true,
    badge: "Most popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large teams with compliance needs.",
    features: ["Everything in Pro", "Self-hosting option", "SSO / SAML", "SLA guarantee", "Dedicated support", "Audit logs"],
    cta: "Get in touch",
  },
];

const STATS = [
  { value: "2,400+", label: "Teams" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "35", label: "Edge regions" },
  { value: "<100ms", label: "Avg. deploy time" },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <div className="bg-white text-gray-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight">
            <span className="text-indigo-600">Flux</span>r
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Log in</a>
            <a
              href="#"
              className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Start free
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-white pt-24 pb-20">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full mb-8 border border-indigo-100">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            Now with edge deployments in 35 regions
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-6">
            Ship faster.<br />
            <span className="text-indigo-600">Scale smarter.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Fluxr gives your team the infrastructure, analytics, and integrations to move at startup speed — no matter your size.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#"
              className="bg-indigo-600 text-white text-sm font-medium px-8 py-3.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Start Free Trial
            </a>
            <a
              href="#"
              className="text-gray-700 text-sm font-medium px-8 py-3.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
            >
              View Demo →
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4">No credit card required · Free forever plan available</p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="border-t border-b border-gray-100 bg-gray-50 py-8">
        <p className="text-center text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">Trusted by engineering teams at</p>
        <div className="flex justify-center items-center gap-10 flex-wrap px-6">
          {LOGOS.map((name) => (
            <span key={name} className="text-gray-300 font-bold text-base select-none">{name}</span>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-4xl font-bold text-gray-900 mb-1">{value}</p>
              <p className="text-sm text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-28">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything your team needs to ship</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Stop stitching together tools. Fluxr is the unified platform for modern teams.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="p-7 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-sm hover:shadow-indigo-50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl mb-5 group-hover:bg-indigo-100 transition-colors">
                {icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-gray-50 border-t border-gray-100 py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, honest pricing</h2>
            <p className="text-gray-500">No hidden fees. Cancel anytime.</p>
          </div>
          <PricingTable tiers={TIERS} />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-28">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Frequently asked questions</h2>
        <div className="divide-y divide-gray-100">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="py-7">
              <p className="font-semibold text-gray-900 mb-2">{q}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-6 mb-16 rounded-3xl bg-indigo-600 py-20 text-center text-white px-6 overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 60% 40%, white 0%, transparent 60%)" }}
        />
        <div className="relative">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to move faster?</h2>
          <p className="text-indigo-200 mb-8 max-w-md mx-auto">
            Join 2,400+ teams already using Fluxr. Free plan, no credit card needed.
          </p>
          <a
            href="#"
            className="inline-block bg-white text-indigo-600 font-semibold text-sm px-10 py-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-xl"
          >
            Get started for free
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span className="font-bold text-gray-700"><span className="text-indigo-600">Flux</span>r</span>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Status</a>
          </div>
          <span>© 2025 Fluxr, Inc.</span>
        </div>
      </footer>

    </div>
  );
}