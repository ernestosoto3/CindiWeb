"use client"

import { useState } from "react"

/* ── 5 SAAS LANDING COLOR PALETTES ── */
const PALETTES = {
  "cool-blues": {
    label: "Cool Blues",
    swatch: "#3674B5",
    background: "#D1F8EF",
    surface: "#A1E3F9",
    primaryBrand: "#3674B5",
    secondaryBrand: "#578FCA",
    accent: "#A1E3F9",
    headingText: "#3674B5",
    bodyText: "#3674B5",
    mutedText: "#3674B5",
    border: "#578FCA",
    ctaButton: "#A1E3F9",
    ctaHover: "#3674B5",
    // Derived
    navBg: "rgba(209,248,239,0.92)",
    navBorder: "rgba(87,143,202,0.2)",
    darkText: "#1a3a5c",
    muted: "#578FCA",
    dim: "rgba(54,116,181,0.4)",
    badgeBg: "rgba(54,116,181,0.08)",
    badgeBorder: "rgba(54,116,181,0.15)",
    badgeDot: "#3674B5",
    gridColor: "rgba(54,116,181,0.06)",
    socialBg: "rgba(54,116,181,0.04)",
    statsBorder: "rgba(87,143,202,0.15)",
    featureCardBg: "#ffffff",
    featureCardBorder: "rgba(87,143,202,0.12)",
    featureCardHoverBorder: "rgba(54,116,181,0.25)",
    featureIconBg: "rgba(54,116,181,0.08)",
    featureIconHoverBg: "rgba(54,116,181,0.15)",
    pricingBg: "rgba(54,116,181,0.03)",
    highlightBorder: "#3674B5",
    highlightBg: "rgba(54,116,181,0.04)",
    highlightGlow: "rgba(54,116,181,0.12)",
    ctaBannerBg: "#3674B5",
    ctaBannerText: "#D1F8EF",
    ctaBannerMuted: "rgba(209,248,239,0.65)",
    ctaBannerBtnBg: "#ffffff",
    ctaBannerBtnText: "#3674B5",
    footerMuted: "#578FCA",
    btnText: "#1a3a5c",
    outlineBorder: "rgba(87,143,202,0.25)",
    outlineText: "#3674B5",
    logoText: "#578FCA",
  },
  indigo: {
    label: "Indigo",
    swatch: "#6367FF",
    background: "#FFDBFD",
    surface: "#C9BEFF",
    primaryBrand: "#6367FF",
    secondaryBrand: "#8494FF",
    accent: "#C9BEFF",
    headingText: "#6367FF",
    bodyText: "#6367FF",
    mutedText: "#6367FF",
    border: "#8494FF",
    ctaButton: "#8494FF",
    ctaHover: "#6367FF",
    navBg: "rgba(255,219,253,0.92)",
    navBorder: "rgba(132,148,255,0.2)",
    darkText: "#2a2a5c",
    muted: "#8494FF",
    dim: "rgba(99,103,255,0.35)",
    badgeBg: "rgba(99,103,255,0.08)",
    badgeBorder: "rgba(99,103,255,0.18)",
    badgeDot: "#6367FF",
    gridColor: "rgba(99,103,255,0.05)",
    socialBg: "rgba(99,103,255,0.04)",
    statsBorder: "rgba(132,148,255,0.15)",
    featureCardBg: "#ffffff",
    featureCardBorder: "rgba(132,148,255,0.12)",
    featureCardHoverBorder: "rgba(99,103,255,0.3)",
    featureIconBg: "rgba(99,103,255,0.08)",
    featureIconHoverBg: "rgba(99,103,255,0.15)",
    pricingBg: "rgba(99,103,255,0.03)",
    highlightBorder: "#6367FF",
    highlightBg: "rgba(99,103,255,0.05)",
    highlightGlow: "rgba(99,103,255,0.12)",
    ctaBannerBg: "#6367FF",
    ctaBannerText: "#FFDBFD",
    ctaBannerMuted: "rgba(255,219,253,0.6)",
    ctaBannerBtnBg: "#ffffff",
    ctaBannerBtnText: "#6367FF",
    footerMuted: "#8494FF",
    btnText: "#2a2a5c",
    outlineBorder: "rgba(132,148,255,0.3)",
    outlineText: "#6367FF",
    logoText: "#8494FF",
  },
  slate: {
    label: "Slate",
    swatch: "#8DBCC7",
    background: "#EBFFD8",
    surface: "#C4E1E6",
    primaryBrand: "#8DBCC7",
    secondaryBrand: "#A4CCD9",
    accent: "#A4CCD9",
    headingText: "#8DBCC7",
    bodyText: "#8DBCC7",
    mutedText: "#8DBCC7",
    border: "#8DBCC7",
    ctaButton: "#A4CCD9",
    ctaHover: "#8DBCC7",
    navBg: "rgba(235,255,216,0.92)",
    navBorder: "rgba(141,188,199,0.2)",
    darkText: "#3a5a5f",
    muted: "#8DBCC7",
    dim: "rgba(141,188,199,0.45)",
    badgeBg: "rgba(141,188,199,0.1)",
    badgeBorder: "rgba(141,188,199,0.2)",
    badgeDot: "#8DBCC7",
    gridColor: "rgba(141,188,199,0.06)",
    socialBg: "rgba(141,188,199,0.05)",
    statsBorder: "rgba(141,188,199,0.15)",
    featureCardBg: "#ffffff",
    featureCardBorder: "rgba(141,188,199,0.12)",
    featureCardHoverBorder: "rgba(141,188,199,0.3)",
    featureIconBg: "rgba(141,188,199,0.1)",
    featureIconHoverBg: "rgba(141,188,199,0.18)",
    pricingBg: "rgba(141,188,199,0.04)",
    highlightBorder: "#8DBCC7",
    highlightBg: "rgba(141,188,199,0.06)",
    highlightGlow: "rgba(141,188,199,0.12)",
    ctaBannerBg: "#8DBCC7",
    ctaBannerText: "#EBFFD8",
    ctaBannerMuted: "rgba(235,255,216,0.65)",
    ctaBannerBtnBg: "#ffffff",
    ctaBannerBtnText: "#5a8a92",
    footerMuted: "#8DBCC7",
    btnText: "#3a5a5f",
    outlineBorder: "rgba(141,188,199,0.3)",
    outlineText: "#6a9fa8",
    logoText: "#8DBCC7",
  },
  "white-gray": {
    label: "White / Light Gray",
    swatch: "#C4DFDF",
    background: "#F8F6F4",
    surface: "#E3F4F4",
    primaryBrand: "#C4DFDF",
    secondaryBrand: "#D2E9E9",
    accent: "#E3F4F4",
    headingText: "#C4DFDF",
    bodyText: "#C4DFDF",
    mutedText: "#C4DFDF",
    border: "#C4DFDF",
    ctaButton: "#E3F4F4",
    ctaHover: "#C4DFDF",
    navBg: "rgba(248,246,244,0.92)",
    navBorder: "rgba(196,223,223,0.25)",
    darkText: "#3a5555",
    muted: "#8aabab",
    dim: "rgba(196,223,223,0.5)",
    badgeBg: "rgba(196,223,223,0.12)",
    badgeBorder: "rgba(196,223,223,0.25)",
    badgeDot: "#8aabab",
    gridColor: "rgba(196,223,223,0.08)",
    socialBg: "rgba(196,223,223,0.08)",
    statsBorder: "rgba(196,223,223,0.2)",
    featureCardBg: "#ffffff",
    featureCardBorder: "rgba(196,223,223,0.2)",
    featureCardHoverBorder: "rgba(196,223,223,0.45)",
    featureIconBg: "rgba(196,223,223,0.15)",
    featureIconHoverBg: "rgba(196,223,223,0.25)",
    pricingBg: "rgba(196,223,223,0.06)",
    highlightBorder: "#8aabab",
    highlightBg: "rgba(196,223,223,0.08)",
    highlightGlow: "rgba(196,223,223,0.15)",
    ctaBannerBg: "#8aabab",
    ctaBannerText: "#F8F6F4",
    ctaBannerMuted: "rgba(248,246,244,0.6)",
    ctaBannerBtnBg: "#ffffff",
    ctaBannerBtnText: "#5a7a7a",
    footerMuted: "#8aabab",
    btnText: "#3a5555",
    outlineBorder: "rgba(196,223,223,0.35)",
    outlineText: "#6a9090",
    logoText: "#8aabab",
  },
  "bright-accent": {
    label: "Bright Accent",
    swatch: "#778873",
    background: "#F1F3E0",
    surface: "#D2DCB6",
    primaryBrand: "#778873",
    secondaryBrand: "#A1BC98",
    accent: "#D2DCB6",
    headingText: "#778873",
    bodyText: "#778873",
    mutedText: "#778873",
    border: "#778873",
    ctaButton: "#D2DCB6",
    ctaHover: "#778873",
    navBg: "rgba(241,243,224,0.92)",
    navBorder: "rgba(119,136,115,0.15)",
    darkText: "#3a4538",
    muted: "#778873",
    dim: "rgba(119,136,115,0.4)",
    badgeBg: "rgba(119,136,115,0.08)",
    badgeBorder: "rgba(119,136,115,0.15)",
    badgeDot: "#778873",
    gridColor: "rgba(119,136,115,0.05)",
    socialBg: "rgba(119,136,115,0.04)",
    statsBorder: "rgba(119,136,115,0.12)",
    featureCardBg: "#ffffff",
    featureCardBorder: "rgba(119,136,115,0.1)",
    featureCardHoverBorder: "rgba(119,136,115,0.25)",
    featureIconBg: "rgba(119,136,115,0.08)",
    featureIconHoverBg: "rgba(119,136,115,0.15)",
    pricingBg: "rgba(119,136,115,0.03)",
    highlightBorder: "#778873",
    highlightBg: "rgba(119,136,115,0.05)",
    highlightGlow: "rgba(119,136,115,0.1)",
    ctaBannerBg: "#778873",
    ctaBannerText: "#F1F3E0",
    ctaBannerMuted: "rgba(241,243,224,0.6)",
    ctaBannerBtnBg: "#ffffff",
    ctaBannerBtnText: "#4a5a47",
    footerMuted: "#778873",
    btnText: "#3a4538",
    outlineBorder: "rgba(119,136,115,0.25)",
    outlineText: "#5a6a57",
    logoText: "#A1BC98",
  },
} as const

type PaletteKey = keyof typeof PALETTES

/* ── CONTENT DATA ── */
const FEATURES = [
  { icon: "⚡", title: "Sub-100ms deploys", desc: "Push to production in seconds. Rollbacks are one click. No YAML ceremonies." },
  { icon: "🔍", title: "End-to-end observability", desc: "Logs, traces, and errors in one place. Stop context-switching between dashboards." },
  { icon: "🤝", title: "Team permissions", desc: "Granular access controls with audit trails. SOC 2 ready out of the box." },
  { icon: "🔗", title: "120+ integrations", desc: "GitHub, Slack, Datadog, PagerDuty — connect the tools you already use." },
  { icon: "📈", title: "Usage analytics", desc: "Understand exactly how your product is used with no tracking scripts to install." },
  { icon: "🌍", title: "Global edge network", desc: "Deploy to 35 regions. Your API stays fast wherever your users are." },
]

const LOGOS = ["Acme Inc.", "Stellar", "NovaCorp", "Orbit", "Helix", "Meridian"]

const TIERS = [
  { name: "Starter", price: "Free", description: "For solo developers and side projects.", features: ["3 projects", "5GB storage", "Community support", "Basic analytics"], cta: "Get started", highlighted: false },
  { name: "Pro", price: "$49", period: "/mo", description: "For growing teams shipping fast.", features: ["Unlimited projects", "50GB storage", "Priority support", "Full analytics", "Team permissions", "Custom domains"], cta: "Start free trial", highlighted: true, badge: "Most popular" },
  { name: "Enterprise", price: "Custom", description: "For large teams with compliance needs.", features: ["Everything in Pro", "Self-hosting option", "SSO / SAML", "SLA guarantee", "Dedicated support", "Audit logs"], cta: "Get in touch", highlighted: false },
]

const FAQS = [
  { q: "How long does setup take?", a: "Most teams are fully configured in under 20 minutes. We handle the infra; you keep the code." },
  { q: "Do I need a credit card to start?", a: "No. The free tier is genuinely useful — up to 3 projects, full feature access, no expiry." },
  { q: "Can I self-host Fluxr?", a: "Yes. Enterprise plans include a self-hosted option with full data residency control." },
  { q: "What happens if I exceed my plan limits?", a: "We'll notify you before anything breaks. Overages are billed at a fair per-unit rate." },
]

const STATS = [
  { value: "2,400+", label: "Teams" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "35", label: "Edge regions" },
  { value: "<100ms", label: "Avg. deploy time" },
]

/* ── PALETTE SWITCHER ── */
function PaletteSwitcher({ current, onChange }: { current: PaletteKey; onChange: (k: PaletteKey) => void }) {
  const [open, setOpen] = useState(false)
  const p = PALETTES[current]
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} aria-label="Change color palette" style={{
        display: "flex", alignItems: "center", gap: "0.4rem",
        background: "none", border: `1px solid ${p.navBorder}`,
        borderRadius: "100px", padding: "0.3rem 0.65rem 0.3rem 0.4rem",
        cursor: "pointer", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase",
        color: p.muted, fontFamily: "system-ui, sans-serif", transition: "all 0.2s",
      }}>
        <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: p.primaryBrand, border: `2px solid ${p.background}`, boxShadow: `0 0 0 1px ${p.navBorder}` }} />
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
          <path d="M2 4L5 7L8 4" stroke={p.muted} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 98 }} />
          <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, backgroundColor: p.background, border: `1px solid ${p.navBorder}`, borderRadius: "12px", padding: "0.5rem", zIndex: 99, minWidth: "190px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
            {(Object.entries(PALETTES) as [PaletteKey, typeof PALETTES[PaletteKey]][]).map(([key, pal]) => (
              <button key={key} onClick={() => { onChange(key); setOpen(false) }} style={{
                display: "flex", alignItems: "center", gap: "0.6rem", width: "100%", padding: "0.45rem 0.55rem",
                background: key === current ? p.surface : "transparent", border: "none", borderRadius: "8px",
                cursor: "pointer", textAlign: "left", transition: "background 0.15s",
              }}
                onMouseEnter={e => { if (key !== current) e.currentTarget.style.background = p.surface }}
                onMouseLeave={e => { if (key !== current) e.currentTarget.style.background = "transparent" }}
              >
                <div style={{ display: "flex", gap: "2px" }}>
                  {[pal.primaryBrand, pal.secondaryBrand, pal.background].map((c, i) => (
                    <span key={i} style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: c, border: "1.5px solid rgba(0,0,0,0.06)" }} />
                  ))}
                </div>
                <span style={{ fontSize: "0.65rem", color: p.darkText, fontFamily: "system-ui, sans-serif", fontWeight: key === current ? 600 : 400 }}>{pal.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ── FEATURE CARD ── */
function FeatureCard({ icon, title, desc, palette }: { icon: string; title: string; desc: string; palette: typeof PALETTES[PaletteKey] }) {
  const [h, setH] = useState(false)
  const p = palette
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      padding: "1.75rem", borderRadius: "1rem",
      border: `1px solid ${h ? p.featureCardHoverBorder : p.featureCardBorder}`,
      backgroundColor: p.featureCardBg,
      boxShadow: h ? `0 2px 12px ${p.highlightGlow}` : "none",
      transition: "all 0.25s",
    }}>
      <div style={{
        width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem",
        backgroundColor: h ? p.featureIconHoverBg : p.featureIconBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.25rem", marginBottom: "1.25rem", transition: "background-color 0.2s",
      }}>{icon}</div>
      <h3 style={{ fontWeight: 600, color: p.darkText, marginBottom: "0.5rem", fontSize: "1rem" }}>{title}</h3>
      <p style={{ fontSize: "0.875rem", color: p.muted, lineHeight: 1.6 }}>{desc}</p>
    </div>
  )
}

/* ── MAIN PAGE ── */
export default function Page() {
  const [paletteKey, setPaletteKey] = useState<PaletteKey>("cool-blues")
  const p = PALETTES[paletteKey]

  return (
    <div style={{ backgroundColor: p.background, color: p.darkText, fontFamily: "system-ui, sans-serif", overflowX: "hidden", transition: "background-color 0.4s, color 0.4s" }}>
      <style>{`
        .saas-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .saas-pricing { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; align-items: start; }
        .saas-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.5rem; text-align: center; }
        @media (max-width: 768px) {
          .saas-features { grid-template-columns: 1fr; }
          .saas-pricing { grid-template-columns: 1fr; }
          .saas-stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* ─── NAV ─── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: p.navBg, backdropFilter: "blur(8px)", borderBottom: `1px solid ${p.navBorder}`, transition: "all 0.4s" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem", height: "4rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.02em", color: p.darkText }}>
            <span style={{ color: p.primaryBrand }}>Flux</span>r
          </span>
          <nav style={{ display: "flex", alignItems: "center", gap: "2rem", fontSize: "0.875rem", color: p.muted }}>
            <a href="#features" style={{ color: "inherit", textDecoration: "none" }}>Features</a>
            <a href="#pricing" style={{ color: "inherit", textDecoration: "none" }}>Pricing</a>
            <a href="#faq" style={{ color: "inherit", textDecoration: "none" }}>FAQ</a>
            <PaletteSwitcher current={paletteKey} onChange={setPaletteKey} />
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <a href="#" style={{ fontSize: "0.875rem", color: p.muted, textDecoration: "none" }}>Log in</a>
            <a href="#" style={{ fontSize: "0.875rem", backgroundColor: p.primaryBrand, color: p.background, padding: "0.5rem 1rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 500, transition: "background-color 0.2s" }}>Start free</a>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "6rem", paddingBottom: "5rem" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.5, backgroundImage: `linear-gradient(to right, ${p.gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${p.gridColor} 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div style={{ position: "relative", maxWidth: "52rem", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", backgroundColor: p.badgeBg, color: p.primaryBrand, padding: "0.35rem 0.75rem", borderRadius: "999px", marginBottom: "2rem", border: `1px solid ${p.badgeBorder}` }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: p.badgeDot }} />
            Now with edge deployments in 35 regions
          </div>
          <h1 style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1.5rem", color: p.darkText }}>
            Ship faster.<br /><span style={{ color: p.primaryBrand }}>Scale smarter.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", color: p.muted, maxWidth: "34rem", margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
            Fluxr gives your team the infrastructure, analytics, and integrations to move at startup speed — no matter your size.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#" style={{ backgroundColor: p.primaryBrand, color: p.background, fontSize: "0.875rem", fontWeight: 500, padding: "0.9rem 2rem", borderRadius: "0.75rem", textDecoration: "none", transition: "background-color 0.2s" }}>Start Free Trial</a>
            <a href="#" style={{ color: p.outlineText, fontSize: "0.875rem", fontWeight: 500, padding: "0.9rem 2rem", borderRadius: "0.75rem", border: `1px solid ${p.outlineBorder}`, textDecoration: "none" }}>View Demo →</a>
          </div>
          <p style={{ fontSize: "0.75rem", color: p.dim, marginTop: "1rem" }}>No credit card required · Free forever plan available</p>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section style={{ borderTop: `1px solid ${p.statsBorder}`, borderBottom: `1px solid ${p.statsBorder}`, backgroundColor: p.socialBg, padding: "2rem 0", transition: "all 0.4s" }}>
        <p style={{ textAlign: "center", fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: p.dim, marginBottom: "1.5rem" }}>Trusted by engineering teams at</p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2.5rem", flexWrap: "wrap", padding: "0 1.5rem" }}>
          {LOGOS.map(name => (
            <span key={name} style={{ color: p.dim, fontWeight: 700, fontSize: "1rem", userSelect: "none" }}>{name}</span>
          ))}
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ padding: "5rem 0", borderBottom: `1px solid ${p.statsBorder}`, transition: "all 0.4s" }}>
        <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="saas-stats">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontSize: "2.5rem", fontWeight: 700, color: p.darkText, marginBottom: "0.25rem" }}>{value}</p>
                <p style={{ fontSize: "0.875rem", color: p.dim }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" style={{ maxWidth: "72rem", margin: "0 auto", padding: "7rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, color: p.darkText, marginBottom: "1rem" }}>Everything your team needs to ship</h2>
          <p style={{ color: p.muted, maxWidth: "34rem", margin: "0 auto" }}>Stop stitching together tools. Fluxr is the unified platform for modern teams.</p>
        </div>
        <div className="saas-features">
          {FEATURES.map(f => <FeatureCard key={f.title} {...f} palette={p} />)}
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" style={{ backgroundColor: p.pricingBg, borderTop: `1px solid ${p.statsBorder}`, padding: "7rem 1.5rem", transition: "all 0.4s" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 700, color: p.darkText, marginBottom: "1rem" }}>Simple, honest pricing</h2>
            <p style={{ color: p.muted }}>No hidden fees. Cancel anytime.</p>
          </div>
          <div className="saas-pricing">
            {TIERS.map(({ name, price, period, description, features, cta, highlighted, badge }) => (
              <div key={name} style={{
                position: "relative", padding: "2rem", borderRadius: "1rem",
                border: highlighted ? `1px solid ${p.highlightBorder}` : `1px solid ${p.featureCardBorder}`,
                backgroundColor: highlighted ? p.highlightBg : p.featureCardBg,
                boxShadow: highlighted ? `0 0 40px ${p.highlightGlow}` : "none",
                transition: "all 0.4s",
              }}>
                {badge && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", backgroundColor: p.primaryBrand, color: p.background, fontSize: "0.7rem", fontWeight: 700, padding: "3px 12px", borderRadius: "999px", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{badge}</div>
                )}
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: p.muted, marginBottom: "1rem" }}>{name}</p>
                <p style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.25rem", color: highlighted ? p.primaryBrand : p.darkText }}>{price}{period && <span style={{ fontSize: "1rem", fontWeight: 400, color: p.muted }}>{period}</span>}</p>
                <p style={{ fontSize: "0.85rem", color: p.muted, marginBottom: "1.5rem" }}>{description}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {features.map(f => (
                    <li key={f} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", fontSize: "0.85rem", color: p.muted }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={highlighted ? p.primaryBrand : p.dim} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button style={{
                  width: "100%", padding: "0.85rem", borderRadius: "0.5rem",
                  backgroundColor: highlighted ? p.primaryBrand : "transparent",
                  border: highlighted ? "none" : `1px solid ${p.outlineBorder}`,
                  color: highlighted ? p.background : p.outlineText,
                  fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
                  fontFamily: "system-ui, sans-serif", transition: "all 0.2s",
                }}>{cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" style={{ maxWidth: "48rem", margin: "0 auto", padding: "7rem 1.5rem" }}>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: p.darkText, textAlign: "center", marginBottom: "4rem" }}>Frequently asked questions</h2>
        <div>
          {FAQS.map(({ q, a }) => (
            <div key={q} style={{ padding: "1.75rem 0", borderBottom: `1px solid ${p.statsBorder}` }}>
              <p style={{ fontWeight: 600, color: p.darkText, marginBottom: "0.5rem" }}>{q}</p>
              <p style={{ fontSize: "0.875rem", color: p.muted, lineHeight: 1.6 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{ margin: "0 1.5rem 4rem", borderRadius: "1.5rem", backgroundColor: p.ctaBannerBg, padding: "5rem 1.5rem", textAlign: "center", overflow: "hidden", position: "relative", transition: "background-color 0.4s" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(circle at 60% 40%, white 0%, transparent 60%)" }} />
        <div style={{ position: "relative" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, color: p.ctaBannerText, marginBottom: "1rem" }}>Ready to move faster?</h2>
          <p style={{ color: p.ctaBannerMuted, marginBottom: "2rem", maxWidth: "28rem", margin: "0 auto 2rem" }}>
            Join 2,400+ teams already using Fluxr. Free plan, no credit card needed.
          </p>
          <a href="#" style={{ display: "inline-block", backgroundColor: p.ctaBannerBtnBg, color: p.ctaBannerBtnText, fontWeight: 600, fontSize: "0.875rem", padding: "1rem 2.5rem", borderRadius: "0.75rem", textDecoration: "none", transition: "background-color 0.2s" }}>Get started for free</a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: `1px solid ${p.statsBorder}`, padding: "2.5rem 1.5rem", transition: "all 0.4s" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", fontSize: "0.875rem", color: p.footerMuted }}>
          <span style={{ fontWeight: 700, color: p.darkText }}><span style={{ color: p.logoText }}>Flux</span>r</span>
          <div style={{ display: "flex", gap: "2rem" }}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Status</a>
          </div>
          <span>© 2025 Fluxr, Inc.</span>
        </div>
      </footer>
    </div>
  )
}