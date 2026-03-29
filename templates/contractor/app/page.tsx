"use client"

import { useState } from "react"

/* ── 6 CONTRACTOR COLOR PALETTES ── */
const PALETTES = {
  navy: {
    label: "Navy",
    swatch: "#0B2D72",
    isDark: false,
    background: "#F6E7BC",
    surface: "#0AC4E0",
    primaryBrand: "#0B2D72",
    secondaryBrand: "#0992C2",
    accent: "#0AC4E0",
    headingText: "#0B2D72",
    bodyText: "#0B2D72",
    mutedText: "#0B2D72",
    border: "#0992C2",
    ctaButton: "#0AC4E0",
    ctaHover: "#0B2D72",
    // Derived
    navBg: "#0B2D72",
    navText: "#F6E7BC",
    navMuted: "rgba(246,231,188,0.65)",
    heroBg: "#0B2D72",
    heroOverlay: "#0B2D72",
    heroText: "#F6E7BC",
    heroMuted: "rgba(246,231,188,0.7)",
    badgeBg: "#0AC4E0",
    badgeText: "#0B2D72",
    statsBg: "#0B2D72",
    statsValue: "#0AC4E0",
    statsLabel: "rgba(246,231,188,0.7)",
    cardBg: "#ffffff",
    cardBorder: "#0992C2",
    cardDesc: "#0B2D72",
    projectBg: "#0B2D72",
    projectOverlay: "rgba(11,45,114,0.9)",
    reviewCardBg: "#ffffff",
    reviewText: "#0B2D72",
    reviewMuted: "#0992C2",
    quoteBg: "#0B2D72",
    quoteText: "#F6E7BC",
    quoteMuted: "rgba(246,231,188,0.6)",
    inputBg: "rgba(246,231,188,0.1)",
    inputBorder: "rgba(246,231,188,0.2)",
    inputText: "#F6E7BC",
    footerBg: "#071d4a",
    footerText: "rgba(246,231,188,0.5)",
    ctaText: "#0B2D72",
  },
  "steel-blue": {
    label: "Steel Blue",
    swatch: "#4A70A9",
    isDark: false,
    background: "#EFECE3",
    surface: "#8FABD4",
    primaryBrand: "#000000",
    secondaryBrand: "#4A70A9",
    accent: "#8FABD4",
    headingText: "#000000",
    bodyText: "#000000",
    mutedText: "#4A70A9",
    border: "#4A70A9",
    ctaButton: "#8FABD4",
    ctaHover: "#000000",
    navBg: "#1a1a1a",
    navText: "#EFECE3",
    navMuted: "rgba(239,236,227,0.6)",
    heroBg: "#1a1a1a",
    heroOverlay: "#1a1a1a",
    heroText: "#EFECE3",
    heroMuted: "rgba(239,236,227,0.65)",
    badgeBg: "#4A70A9",
    badgeText: "#ffffff",
    statsBg: "#4A70A9",
    statsValue: "#ffffff",
    statsLabel: "rgba(255,255,255,0.75)",
    cardBg: "#ffffff",
    cardBorder: "#d1d5db",
    cardDesc: "#4A70A9",
    projectBg: "#1a1a1a",
    projectOverlay: "rgba(26,26,26,0.9)",
    reviewCardBg: "#ffffff",
    reviewText: "#333333",
    reviewMuted: "#4A70A9",
    quoteBg: "#1a1a1a",
    quoteText: "#EFECE3",
    quoteMuted: "rgba(239,236,227,0.55)",
    inputBg: "rgba(255,255,255,0.07)",
    inputBorder: "rgba(255,255,255,0.15)",
    inputText: "#ffffff",
    footerBg: "#111111",
    footerText: "rgba(239,236,227,0.45)",
    ctaText: "#000000",
  },
  "gray-white": {
    label: "Gray / White",
    swatch: "#495464",
    isDark: false,
    background: "#F4F4F2",
    surface: "#E8E8E8",
    primaryBrand: "#495464",
    secondaryBrand: "#BBBFCA",
    accent: "#495464",
    headingText: "#495464",
    bodyText: "#495464",
    mutedText: "#495464",
    border: "#495464",
    ctaButton: "#495464",
    ctaHover: "#BBBFCA",
    navBg: "#495464",
    navText: "#F4F4F2",
    navMuted: "rgba(244,244,242,0.6)",
    heroBg: "#495464",
    heroOverlay: "#495464",
    heroText: "#F4F4F2",
    heroMuted: "rgba(244,244,242,0.65)",
    badgeBg: "#BBBFCA",
    badgeText: "#495464",
    statsBg: "#495464",
    statsValue: "#F4F4F2",
    statsLabel: "rgba(244,244,242,0.7)",
    cardBg: "#ffffff",
    cardBorder: "#E8E8E8",
    cardDesc: "#6b7280",
    projectBg: "#495464",
    projectOverlay: "rgba(73,84,100,0.9)",
    reviewCardBg: "#ffffff",
    reviewText: "#495464",
    reviewMuted: "#BBBFCA",
    quoteBg: "#495464",
    quoteText: "#F4F4F2",
    quoteMuted: "rgba(244,244,242,0.55)",
    inputBg: "rgba(255,255,255,0.07)",
    inputBorder: "rgba(255,255,255,0.15)",
    inputText: "#ffffff",
    footerBg: "#333b47",
    footerText: "rgba(244,244,242,0.45)",
    ctaText: "#ffffff",
  },
  "deep-charcoal": {
    label: "Deep Charcoal",
    swatch: "#5A9690",
    isDark: true,
    background: "#432323",
    surface: "#2F5755",
    primaryBrand: "#5A9690",
    secondaryBrand: "#E0D9D9",
    accent: "#432323",
    headingText: "#E0D9D9",
    bodyText: "#5A9690",
    mutedText: "#5A9690",
    border: "#2F5755",
    ctaButton: "#5A9690",
    ctaHover: "#E0D9D9",
    navBg: "#2a1515",
    navText: "#E0D9D9",
    navMuted: "rgba(224,217,217,0.55)",
    heroBg: "#2a1515",
    heroOverlay: "#2a1515",
    heroText: "#E0D9D9",
    heroMuted: "rgba(224,217,217,0.6)",
    badgeBg: "#5A9690",
    badgeText: "#432323",
    statsBg: "#2F5755",
    statsValue: "#E0D9D9",
    statsLabel: "rgba(224,217,217,0.65)",
    cardBg: "#3a2020",
    cardBorder: "#2F5755",
    cardDesc: "#5A9690",
    projectBg: "#2a1515",
    projectOverlay: "rgba(42,21,21,0.9)",
    reviewCardBg: "#3a2020",
    reviewText: "#E0D9D9",
    reviewMuted: "#5A9690",
    quoteBg: "#2a1515",
    quoteText: "#E0D9D9",
    quoteMuted: "rgba(90,150,144,0.6)",
    inputBg: "rgba(90,150,144,0.1)",
    inputBorder: "rgba(90,150,144,0.25)",
    inputText: "#E0D9D9",
    footerBg: "#1a0e0e",
    footerText: "rgba(90,150,144,0.5)",
    ctaText: "#432323",
  },
  "dark-green": {
    label: "Dark Green",
    swatch: "#1F7D53",
    isDark: true,
    background: "#18230F",
    surface: "#27391C",
    primaryBrand: "#1F7D53",
    secondaryBrand: "#255F38",
    accent: "#1F7D53",
    headingText: "#1F7D53",
    bodyText: "#1F7D53",
    mutedText: "#1F7D53",
    border: "#27391C",
    ctaButton: "#1F7D53",
    ctaHover: "#255F38",
    navBg: "#0e150a",
    navText: "#1F7D53",
    navMuted: "rgba(31,125,83,0.6)",
    heroBg: "#0e150a",
    heroOverlay: "#0e150a",
    heroText: "#1F7D53",
    heroMuted: "rgba(31,125,83,0.6)",
    badgeBg: "#1F7D53",
    badgeText: "#18230F",
    statsBg: "#1F7D53",
    statsValue: "#18230F",
    statsLabel: "rgba(24,35,15,0.7)",
    cardBg: "#1e2c14",
    cardBorder: "#27391C",
    cardDesc: "rgba(31,125,83,0.75)",
    projectBg: "#0e150a",
    projectOverlay: "rgba(14,21,10,0.9)",
    reviewCardBg: "#1e2c14",
    reviewText: "#1F7D53",
    reviewMuted: "#255F38",
    quoteBg: "#0e150a",
    quoteText: "#1F7D53",
    quoteMuted: "rgba(37,95,56,0.6)",
    inputBg: "rgba(31,125,83,0.08)",
    inputBorder: "rgba(31,125,83,0.25)",
    inputText: "#1F7D53",
    footerBg: "#080d06",
    footerText: "rgba(31,125,83,0.45)",
    ctaText: "#18230F",
  },
  "orange-accent": {
    label: "Orange Accent",
    swatch: "#FA812F",
    isDark: false,
    background: "#FEF3E2",
    surface: "#F3C623",
    primaryBrand: "#FA812F",
    secondaryBrand: "#FFB22C",
    accent: "#FFB22C",
    headingText: "#FA812F",
    bodyText: "#FA812F",
    mutedText: "#FA812F",
    border: "#FA812F",
    ctaButton: "#FFB22C",
    ctaHover: "#FA812F",
    navBg: "#3d2008",
    navText: "#FEF3E2",
    navMuted: "rgba(254,243,226,0.65)",
    heroBg: "#3d2008",
    heroOverlay: "#3d2008",
    heroText: "#FEF3E2",
    heroMuted: "rgba(254,243,226,0.7)",
    badgeBg: "#FA812F",
    badgeText: "#ffffff",
    statsBg: "#FA812F",
    statsValue: "#ffffff",
    statsLabel: "rgba(255,255,255,0.75)",
    cardBg: "#ffffff",
    cardBorder: "#FFB22C",
    cardDesc: "#FA812F",
    projectBg: "#3d2008",
    projectOverlay: "rgba(61,32,8,0.9)",
    reviewCardBg: "#ffffff",
    reviewText: "#3d2008",
    reviewMuted: "#FA812F",
    quoteBg: "#3d2008",
    quoteText: "#FEF3E2",
    quoteMuted: "rgba(254,243,226,0.55)",
    inputBg: "rgba(255,255,255,0.08)",
    inputBorder: "rgba(255,255,255,0.18)",
    inputText: "#FEF3E2",
    footerBg: "#2a1605",
    footerText: "rgba(254,243,226,0.4)",
    ctaText: "#ffffff",
  },
} as const

type PaletteKey = keyof typeof PALETTES

/* ── CONTENT DATA ── */
const SERVICES = [
  { icon: "🏠", title: "Home Remodeling", desc: "Kitchens, bathrooms, full home renovations. On time, on budget." },
  { icon: "🔧", title: "Plumbing & HVAC", desc: "Installations, repairs, and emergency service. Licensed & insured." },
  { icon: "⚡", title: "Electrical Work", desc: "Panel upgrades, rewiring, EV charger installs. Code-compliant." },
  { icon: "🪟", title: "Windows & Doors", desc: "Energy-efficient replacements that reduce your utility bills." },
  { icon: "🏗️", title: "Additions & ADUs", desc: "Room additions, garage conversions, accessory dwelling units." },
  { icon: "🎨", title: "Interior & Exterior Paint", desc: "Clean lines, premium materials, and crews that show up on time." },
]

const PROJECTS = [
  { title: "Sunset Hills Kitchen Remodel", tag: "Remodel", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80" },
  { title: "Downtown Loft Bathroom", tag: "Renovation", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&q=80" },
  { title: "Eastside Home Addition", tag: "Addition", img: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=700&q=80" },
  { title: "Hillcrest ADU Build", tag: "New Build", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" },
]

const REVIEWS = [
  { text: "Mason & Sons finished our kitchen 3 days early. The crew was professional, clean, and the quality is outstanding.", name: "David R.", location: "Homeowner, San Diego" },
  { text: "We've used them twice now. Fair quotes, no surprises, and the work holds up. Easy recommendation.", name: "Tanya & Chris L.", location: "Homeowners, Chula Vista" },
  { text: "Called for an emergency plumbing issue at 7pm. They showed up within 2 hours and fixed it same night.", name: "Greg M.", location: "Property Manager" },
]

const STATS = [
  { value: "400+", label: "Projects completed" },
  { value: "18 yrs", label: "In business" },
  { value: "100%", label: "Licensed & insured" },
  { value: "4.8★", label: "Google rating" },
]

/* ── PALETTE SWITCHER ── */
function PaletteSwitcher({ current, onChange }: { current: PaletteKey; onChange: (k: PaletteKey) => void }) {
  const [open, setOpen] = useState(false)
  const p = PALETTES[current]

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change color palette"
        style={{
          display: "flex", alignItems: "center", gap: "0.4rem",
          background: "none", border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "100px", padding: "0.3rem 0.7rem 0.3rem 0.45rem",
          cursor: "pointer", fontSize: "0.6rem",
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: p.navMuted, fontFamily: "system-ui, sans-serif",
          transition: "all 0.2s",
        }}
      >
        <span style={{
          width: 12, height: 12, borderRadius: "50%",
          backgroundColor: p.primaryBrand,
          border: "2px solid rgba(255,255,255,0.15)",
        }} />
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
          <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 98 }} />
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", right: 0,
            backgroundColor: p.navBg,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px", padding: "0.5rem",
            zIndex: 99, minWidth: "175px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}>
            {(Object.entries(PALETTES) as [PaletteKey, typeof PALETTES[PaletteKey]][]).map(([key, pal]) => (
              <button
                key={key}
                onClick={() => { onChange(key); setOpen(false) }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  width: "100%", padding: "0.45rem 0.55rem",
                  background: key === current ? "rgba(255,255,255,0.08)" : "transparent",
                  border: "none", borderRadius: "5px",
                  cursor: "pointer", textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => { if (key !== current) e.currentTarget.style.background = "rgba(255,255,255,0.05)" }}
                onMouseLeave={e => { if (key !== current) e.currentTarget.style.background = "transparent" }}
              >
                <div style={{ display: "flex", gap: "2px" }}>
                  {[pal.primaryBrand, pal.secondaryBrand, pal.background].map((c, i) => (
                    <span key={i} style={{
                      width: 11, height: 11, borderRadius: "50%",
                      backgroundColor: c,
                      border: "1.5px solid rgba(255,255,255,0.15)",
                    }} />
                  ))}
                </div>
                <span style={{
                  fontSize: "0.65rem", color: p.navText,
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: key === current ? 600 : 400,
                  opacity: key === current ? 1 : 0.7,
                }}>{pal.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ── QUOTE FORM ── */
function QuoteForm({ palette }: { palette: typeof PALETTES[PaletteKey] }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [sent, setSent] = useState(false)
  const p = palette

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.85rem 1rem",
    backgroundColor: p.inputBg,
    border: `1px solid ${p.inputBorder}`,
    color: p.inputText, fontSize: "0.875rem",
    fontFamily: "system-ui, sans-serif", outline: "none",
    boxSizing: "border-box",
  }

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "0.7rem", letterSpacing: "0.15em",
    textTransform: "uppercase", color: p.quoteMuted,
    fontFamily: "system-ui, sans-serif", marginBottom: "0.4rem",
  }

  if (sent) return (
    <div style={{
      padding: "2rem",
      border: `1px solid ${p.primaryBrand}`,
      backgroundColor: `${p.primaryBrand}12`,
      textAlign: "center",
    }}>
      <p style={{ fontSize: "1rem", color: p.primaryBrand, fontWeight: 700 }}>We'll be in touch within 24 hours.</p>
      <p style={{ fontSize: "0.85rem", color: p.quoteMuted, marginTop: "0.5rem" }}>A team member will reach out to schedule your free estimate.</p>
    </div>
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={labelStyle}>Name *</label>
        <input style={inputStyle} type="text" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      </div>
      <div>
        <label style={labelStyle}>Email *</label>
        <input style={inputStyle} type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      </div>
      <div>
        <label style={labelStyle}>Phone</label>
        <input style={inputStyle} type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
      </div>
      <div>
        <label style={labelStyle}>Project Details *</label>
        <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "110px" }} placeholder="Describe what you need done…" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      </div>
      <button
        onClick={() => { if (form.name && form.email) setSent(true) }}
        style={{
          width: "100%", padding: "1rem",
          backgroundColor: p.ctaButton, color: p.ctaText,
          border: "none", fontSize: "0.85rem", fontWeight: 700,
          letterSpacing: "0.05em", textTransform: "uppercase",
          fontFamily: "system-ui, sans-serif", cursor: "pointer",
          transition: "background-color 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = p.ctaHover}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = p.ctaButton}
      >
        Request Free Quote
      </button>
    </div>
  )
}

/* ── MAIN PAGE ── */
export default function Page() {
  const [paletteKey, setPaletteKey] = useState<PaletteKey>("navy")
  const p = PALETTES[paletteKey]

  return (
    <div style={{
      backgroundColor: p.background, color: p.bodyText,
      fontFamily: "system-ui, sans-serif", overflowX: "hidden",
      transition: "background-color 0.4s, color 0.4s",
    }}>
      <style>{`
        .con-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .con-projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .con-reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .con-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; text-align: center; }
        .con-quote-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
        @media (max-width: 768px) {
          .con-services-grid { grid-template-columns: 1fr; }
          .con-projects-grid { grid-template-columns: 1fr; }
          .con-reviews-grid { grid-template-columns: 1fr; }
          .con-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .con-quote-grid { grid-template-columns: 1fr; gap: 3rem; }
        }
      `}</style>

      {/* ─── NAV ─── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: p.navBg,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2.5rem", height: "4.5rem",
        transition: "background-color 0.4s",
      }}>
        <span style={{ fontSize: "1.1rem", fontWeight: 800, color: p.navText, letterSpacing: "-0.02em" }}>
          Mason<span style={{ color: p.primaryBrand }}>&amp;</span>Sons
        </span>
        <nav style={{ display: "flex", gap: "2rem", fontSize: "0.85rem", color: p.navMuted, alignItems: "center" }}>
          <a href="#services" style={{ color: "inherit", textDecoration: "none" }}>Services</a>
          <a href="#work" style={{ color: "inherit", textDecoration: "none" }}>Our Work</a>
          <a href="#quote" style={{ color: "inherit", textDecoration: "none" }}>Get a Quote</a>
          <PaletteSwitcher current={paletteKey} onChange={setPaletteKey} />
        </nav>
        <a href="tel:5551234567" style={{
          backgroundColor: p.ctaButton, color: p.ctaText,
          padding: "0.6rem 1.4rem", textDecoration: "none",
          fontSize: "0.85rem", fontWeight: 700,
          transition: "background-color 0.3s",
        }}>
          (555) 123-4567
        </a>
      </header>

      {/* ─── HERO ─── */}
      <section style={{
        position: "relative", minHeight: "88vh",
        display: "flex", alignItems: "center", overflow: "hidden",
        backgroundColor: p.heroBg,
        transition: "background-color 0.4s",
      }}>
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80" alt="Construction" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${p.heroOverlay} 50%, transparent 100%)` }} />
        <div style={{ position: "relative", maxWidth: "72rem", margin: "0 auto", padding: "6rem 2.5rem", width: "100%" }}>
          <div style={{ maxWidth: "36rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              backgroundColor: p.badgeBg, color: p.badgeText,
              padding: "0.35rem 0.85rem", fontSize: "0.75rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2rem",
            }}>
              <span>●</span> Licensed · Bonded · Insured
            </div>
            <h1 style={{
              fontSize: "clamp(2.8rem, 5vw, 5.5rem)", fontWeight: 900,
              color: p.heroText, lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: "1.5rem",
            }}>
              We build.<br />You enjoy.
            </h1>
            <p style={{ fontSize: "1.1rem", color: p.heroMuted, lineHeight: 1.6, marginBottom: "2.5rem", maxWidth: "30rem" }}>
              San Diego's most trusted general contractor for home remodels, additions, and repairs. 18 years. 400+ projects.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#quote" style={{
                backgroundColor: p.ctaButton, color: p.ctaText,
                padding: "1rem 2.5rem", textDecoration: "none",
                fontSize: "0.9rem", fontWeight: 700,
                transition: "background-color 0.3s",
              }}>Get a Free Quote</a>
              <a href="#work" style={{
                border: "1px solid rgba(255,255,255,0.2)", color: p.heroText,
                padding: "1rem 2.5rem", textDecoration: "none", fontSize: "0.9rem",
              }}>See Our Work →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ backgroundColor: p.statsBg, padding: "2.5rem 0", transition: "background-color 0.4s" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="con-stats-grid">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontSize: "2rem", fontWeight: 900, color: p.statsValue, letterSpacing: "-0.02em" }}>{value}</p>
                <p style={{ fontSize: "0.75rem", color: p.statsLabel, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" style={{ maxWidth: "72rem", margin: "0 auto", padding: "6rem 2rem" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: p.primaryBrand, marginBottom: "0.75rem" }}>What We Do</p>
          <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", color: p.headingText }}>Services</h2>
        </div>
        <div className="con-services-grid">
          {SERVICES.map(({ icon, title, desc }) => (
            <div key={title} style={{
              padding: "2rem",
              border: `1px solid ${p.cardBorder}`,
              backgroundColor: p.cardBg,
              transition: "all 0.4s",
            }}>
              <span style={{ fontSize: "2rem", display: "block", marginBottom: "1rem" }}>{icon}</span>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", color: p.headingText }}>{title}</h3>
              <p style={{ fontSize: "0.875rem", color: p.cardDesc, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROJECT GALLERY ─── */}
      <section id="work" style={{ backgroundColor: p.projectBg, padding: "6rem 2rem", transition: "background-color 0.4s" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: p.primaryBrand, marginBottom: "0.75rem" }}>Portfolio</p>
            <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 800, color: p.heroText, letterSpacing: "-0.02em" }}>Recent Work</h2>
          </div>
          <div className="con-projects-grid">
            {PROJECTS.map(({ title, tag, img }) => (
              <div key={title} style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                  <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem", background: `linear-gradient(to top, ${p.projectOverlay}, transparent)` }}>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: p.primaryBrand, display: "block", marginBottom: "0.3rem" }}>{tag}</span>
                  <p style={{ color: p.heroText, fontWeight: 600, fontSize: "1rem" }}>{title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section style={{ padding: "6rem 2rem", backgroundColor: p.background, transition: "background-color 0.4s" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: p.primaryBrand, marginBottom: "0.75rem", textAlign: "center" }}>Reviews</p>
          <h2 style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", textAlign: "center", marginBottom: "3.5rem", color: p.headingText }}>What clients say</h2>
          <div className="con-reviews-grid">
            {REVIEWS.map(({ text, name, location }) => (
              <div key={name} style={{
                backgroundColor: p.reviewCardBg, padding: "2rem",
                border: `1px solid ${p.cardBorder}`,
                transition: "all 0.4s",
              }}>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: p.reviewText, marginBottom: "1.25rem" }}>"{text}"</p>
                <p style={{ fontWeight: 700, fontSize: "0.875rem", color: p.headingText }}>{name}</p>
                <p style={{ fontSize: "0.75rem", color: p.reviewMuted, marginTop: "0.2rem" }}>{location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUOTE ─── */}
      <section id="quote" style={{ backgroundColor: p.quoteBg, padding: "6rem 2rem", transition: "background-color 0.4s" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <div className="con-quote-grid">
            <div>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: p.primaryBrand, marginBottom: "1rem" }}>Free Estimate</p>
              <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 800, color: p.quoteText, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Get a free<br />quote today.
              </h2>
              <p style={{ fontSize: "0.9rem", color: p.quoteMuted, lineHeight: 1.7, marginBottom: "2rem" }}>
                Describe your project and we'll get back to you within 24 hours with a no-obligation estimate.
              </p>
              <div style={{ fontSize: "0.85rem", color: p.quoteMuted, lineHeight: 2.2 }}>
                <p>Mon – Fri: 7am – 6pm</p>
                <p>Saturday: 8am – 4pm</p>
                <p style={{ marginTop: "0.75rem", color: p.primaryBrand }}>(555) 123-4567</p>
                <p>hello@masonandsons.com</p>
              </div>
            </div>
            <QuoteForm palette={p} />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        backgroundColor: p.footerBg, padding: "1.75rem 2.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: "0.8rem", color: p.footerText,
        transition: "background-color 0.4s",
      }}>
        <span style={{ fontWeight: 800, color: p.navText }}>
          Mason<span style={{ color: p.primaryBrand }}>&amp;</span>Sons
        </span>
        <span>© 2025 Mason & Sons Construction</span>
      </footer>
    </div>
  )
}