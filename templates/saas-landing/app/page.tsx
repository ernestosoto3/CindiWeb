import { Navbar, Footer, Button, HeroSection, PricingTable } from "@cindiweb/ui";
import type { PricingTier } from "@cindiweb/ui";

const FEATURES = [
  { icon: "⚡", title: "Blazing Fast", desc: "Sub-100ms response times. Built on edge infrastructure worldwide." },
  { icon: "🔒", title: "Enterprise Security", desc: "SOC 2 Type II certified. End-to-end encryption on all data." },
  { icon: "📊", title: "Real-Time Analytics", desc: "Live dashboards. Know what's happening the moment it happens." },
  { icon: "🔗", title: "100+ Integrations", desc: "Connect to Slack, Notion, Zapier, and everything else you use." },
  { icon: "🤝", title: "Team Collaboration", desc: "Roles, permissions, shared workspaces. Built for teams of any size." },
  { icon: "🛠️", title: "Developer API", desc: "REST and GraphQL. Full SDK support. Webhooks included." },
];

const TIERS: PricingTier[] = [
  { name: "Starter", price: "$0", period: "mo", description: "For individuals and small projects.", features: ["Up to 3 projects", "1,000 API calls/mo", "Community support", "Basic analytics"], cta: "Get Started Free" },
  { name: "Pro", price: "$49", period: "mo", description: "For growing teams who need more.", features: ["Unlimited projects", "50,000 API calls/mo", "Priority email support", "Advanced analytics", "Custom integrations"], cta: "Start Free Trial", highlighted: true },
  { name: "Enterprise", price: "Custom", description: "For large orgs with complex needs.", features: ["Unlimited everything", "Dedicated infrastructure", "SLA guarantee", "Custom contracts", "24/7 phone support"], cta: "Contact Sales" },
];

const FAQS = [
  { q: "Do I need a credit card to sign up?", a: "No. The Starter plan is free forever with no card required." },
  { q: "Can I change plans at any time?", a: "Yes, upgrade or downgrade anytime. We prorate automatically." },
  { q: "Is my data safe?", a: "Absolutely. We're SOC 2 Type II certified and never sell your data." },
];

export default function Page() {
  return (
    <>
      <Navbar logo={<span className="font-bold text-indigo-600">Fluxr</span>} links={[
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ]} cta={<Button size="sm">Start Free</Button>} />
      <HeroSection
        headline="Ship faster. Scale smarter."
        subheadline="Fluxr gives your team the infrastructure, analytics, and integrations to move at startup speed — no matter your size."
        cta={<div className="flex gap-4 justify-center"><Button size="lg">Start Free Trial</Button><Button size="lg" variant="secondary">View Demo</Button></div>}
      />
      {/* Social proof strip */}
      <div className="bg-gray-50 border-y border-gray-200 py-6">
        <p className="text-center text-sm text-gray-400 tracking-widest uppercase">Trusted by 2,000+ teams at</p>
        <div className="flex justify-center gap-12 mt-4 opacity-40">
          {["Acme Inc", "Stellar", "NovaCorp", "Orbit", "Helix"].map((c) => (
            <span key={c} className="text-gray-700 font-bold text-sm">{c}</span>
          ))}
        </div>
      </div>
      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Everything you need to ship</h2>
        <p className="text-center text-gray-500 mb-16 max-w-xl mx-auto">Stop stitching together tools. Fluxr is the unified platform for modern teams.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all">
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Simple, honest pricing</h2>
          <p className="text-center text-gray-500 mb-16">No hidden fees. Cancel anytime.</p>
          <PricingTable tiers={TIERS} />
        </div>
      </section>
      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently asked questions</h2>
        <div className="flex flex-col gap-6">
          {FAQS.map((f) => (
            <div key={f.q} className="border-b border-gray-200 pb-6">
              <p className="font-semibold text-gray-900 mb-2">{f.q}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Final CTA */}
      <section className="bg-indigo-600 py-20 text-center text-white px-6">
        <h2 className="text-4xl font-bold mb-4">Ready to move faster?</h2>
        <p className="text-indigo-200 mb-8 max-w-md mx-auto">Join 2,000+ teams already using Fluxr. No credit card needed.</p>
        <Button size="lg" variant="secondary">Start Free Today</Button>
      </section>
      <Footer brandName="Fluxr" />
    </>
  );
}