"use client"

import { useState } from "react"

/* ── 6 SALON COLOR PALETTES ── */
const PALETTES = {
  "warm-neutrals": {
    label: "Soft Warm Neutrals",
    swatch: "#E36A6A",
    isDark: false,
    background: "#FFFBF1",
    surface: "#FFF2D0",
    primaryBrand: "#E36A6A",
    secondaryBrand: "#FFB2B2",
    accent: "#FFB2B2",
    headingText: "#E36A6A",
    bodyText: "#E36A6A",
    mutedText: "#E36A6A",
    border: "#E36A6A",
    ctaButton: "#FFB2B2",
    ctaHover: "#E36A6A",
    // Derived — used for subtle tints, dark text fallbacks
    navBg: "rgba(255,251,241,0.95)",
    heroGradient: "#FFFBF1",
    darkText: "#3d1a1a",
    cardBg: "#FFFBF1",
    reviewsBg: "#3d1a1a",
    reviewsText: "#FFB2B2",
    reviewsMuted: "#E36A6A",
    inputBg: "#FFFBF1",
  },
  "blush-pink": {
    label: "Blush / Dusty Pink",
    swatch: "#F13E93",
    isDark: false,
    background: "#FAFFCB",
    surface: "#F9D0CD",
    primaryBrand: "#F13E93",
    secondaryBrand: "#F891BB",
    accent: "#F891BB",
    headingText: "#F13E93",
    bodyText: "#F13E93",
    mutedText: "#F13E93",
    border: "#F891BB",
    ctaButton: "#F891BB",
    ctaHover: "#F13E93",
    navBg: "rgba(250,255,203,0.95)",
    heroGradient: "#FAFFCB",
    darkText: "#5a0e38",
    cardBg: "#FAFFCB",
    reviewsBg: "#5a0e38",
    reviewsText: "#F9D0CD",
    reviewsMuted: "#F891BB",
    inputBg: "#FAFFCB",
  },
  taupe: {
    label: "Taupe",
    swatch: "#B6AE9F",
    isDark: false,
    background: "#FBF3D1",
    surface: "#DEDED1",
    primaryBrand: "#B6AE9F",
    secondaryBrand: "#C5C7BC",
    accent: "#DEDED1",
    headingText: "#B6AE9F",
    bodyText: "#B6AE9F",
    mutedText: "#B6AE9F",
    border: "#B6AE9F",
    ctaButton: "#DEDED1",
    ctaHover: "#B6AE9F",
    navBg: "rgba(251,243,209,0.95)",
    heroGradient: "#FBF3D1",
    darkText: "#3e3a32",
    cardBg: "#FBF3D1",
    reviewsBg: "#3e3a32",
    reviewsText: "#DEDED1",
    reviewsMuted: "#B6AE9F",
    inputBg: "#FBF3D1",
  },
  champagne: {
    label: "Champagne",
    swatch: "#ED9455",
    isDark: false,
    background: "#FFFBDA",
    surface: "#FFEC9E",
    primaryBrand: "#ED9455",
    secondaryBrand: "#FFBB70",
    accent: "#FFBB70",
    headingText: "#ED9455",
    bodyText: "#ED9455",
    mutedText: "#ED9455",
    border: "#ED9455",
    ctaButton: "#FFBB70",
    ctaHover: "#ED9455",
    navBg: "rgba(255,251,218,0.95)",
    heroGradient: "#FFFBDA",
    darkText: "#4a2e12",
    cardBg: "#FFFBDA",
    reviewsBg: "#4a2e12",
    reviewsText: "#FFEC9E",
    reviewsMuted: "#ED9455",
    inputBg: "#FFFBDA",
  },
  "muted-mauve": {
    label: "Muted Mauve",
    swatch: "#D0A2F7",
    isDark: false,
    background: "#F1EAFF",
    surface: "#E5D4FF",
    primaryBrand: "#D0A2F7",
    secondaryBrand: "#DCBFFF",
    accent: "#DCBFFF",
    headingText: "#D0A2F7",
    bodyText: "#D0A2F7",
    mutedText: "#D0A2F7",
    border: "#D0A2F7",
    ctaButton: "#DCBFFF",
    ctaHover: "#D0A2F7",
    navBg: "rgba(241,234,255,0.95)",
    heroGradient: "#F1EAFF",
    darkText: "#2e1a4a",
    cardBg: "#F1EAFF",
    reviewsBg: "#2e1a4a",
    reviewsText: "#E5D4FF",
    reviewsMuted: "#D0A2F7",
    inputBg: "#F1EAFF",
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
    navBg: "rgba(67,35,35,0.95)",
    heroGradient: "#432323",
    darkText: "#E0D9D9",
    cardBg: "#432323",
    reviewsBg: "#1a1212",
    reviewsText: "#E0D9D9",
    reviewsMuted: "#5A9690",
    inputBg: "#3a2020",
  },
} as const

type PaletteKey = keyof typeof PALETTES

/* ── CONTENT DATA ── */
const SERVICES = [
  { name: "Signature Facial", duration: "60 min", price: "$95", desc: "Deep cleanse, exfoliation, and custom masque tailored to your skin." },
  { name: "Swedish Massage", duration: "90 min", price: "$130", desc: "Full-body relaxation with warm oils and long, flowing strokes." },
  { name: "Balayage & Color", duration: "2–3 hrs", price: "From $180", desc: "Hand-painted highlights for a natural, sun-kissed finish." },
  { name: "Keratin Treatment", duration: "2 hrs", price: "$220", desc: "Smoothing treatment for frizz-free, glossy hair lasting 3–4 months." },
  { name: "Classic Mani-Pedi", duration: "75 min", price: "$65", desc: "Nail shaping, cuticle care, and your choice of gel or classic polish." },
  { name: "Lash Lift & Tint", duration: "45 min", price: "$85", desc: "Curl, lift, and darken your natural lashes — no extensions needed." },
]

const TEAM = [
  { name: "Sofia Reyes", role: "Master Colorist", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { name: "Camille Noel", role: "Esthetician", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
  { name: "Jade Moreau", role: "Nail Artist", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80" },
]

const REVIEWS = [
  { text: "Sofia completely transformed my hair. I've never felt more confident walking out of a salon.", name: "Isabella T." },
  { text: "The most relaxing facial I've ever had. My skin glowed for weeks. Already booked my next visit.", name: "Renata M." },
  { text: "Velour feels like a sanctuary. Every visit is an experience, not just an appointment.", name: "Caroline B." },
]

const GALLERY = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80",
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=80",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=500&q=80",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&q=80",
]

/* ── PALETTE SWITCHER COMPONENT ── */
function PaletteSwitcher({ current, onChange }: { current: PaletteKey; onChange: (k: PaletteKey) => void }) {
  const [open, setOpen] = useState(false)
  const palette = PALETTES[current]

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change color palette"
        style={{
          display: "flex", alignItems: "center", gap: "0.45rem",
          background: "none", border: `1px solid ${palette.border}`,
          borderRadius: "100px", padding: "0.35rem 0.75rem 0.35rem 0.5rem",
          cursor: "pointer", fontSize: "0.65rem",
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: palette.mutedText, fontFamily: "system-ui, sans-serif",
          transition: "all 0.2s",
        }}
      >
        <span style={{
          width: 14, height: 14, borderRadius: "50%",
          backgroundColor: palette.primaryBrand,
          border: `2px solid ${palette.background}`,
          boxShadow: `0 0 0 1px ${palette.border}`,
        }} />
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
          <path d="M2 4L5 7L8 4" stroke={palette.mutedText} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 98 }}
          />
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", right: 0,
            backgroundColor: palette.background,
            border: `1px solid ${palette.border}`,
            borderRadius: "8px", padding: "0.5rem",
            zIndex: 99, minWidth: "180px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }}>
            {(Object.entries(PALETTES) as [PaletteKey, typeof PALETTES[PaletteKey]][]).map(([key, p]) => (
              <button
                key={key}
                onClick={() => { onChange(key); setOpen(false) }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  width: "100%", padding: "0.5rem 0.6rem",
                  background: key === current ? palette.surface : "transparent",
                  border: "none", borderRadius: "5px",
                  cursor: "pointer", textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => { if (key !== current) e.currentTarget.style.background = palette.surface }}
                onMouseLeave={e => { if (key !== current) e.currentTarget.style.background = "transparent" }}
              >
                <div style={{ display: "flex", gap: "2px" }}>
                  {[p.primaryBrand, p.secondaryBrand, p.background].map((c, i) => (
                    <span key={i} style={{
                      width: 12, height: 12, borderRadius: "50%",
                      backgroundColor: c,
                      border: `1.5px solid ${p.isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)"}`,
                    }} />
                  ))}
                </div>
                <span style={{
                  fontSize: "0.7rem", color: palette.bodyText,
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: key === current ? 600 : 400,
                }}>{p.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ── BOOKING FORM ── */
function BookingForm({ palette }: { palette: typeof PALETTES[PaletteKey] }) {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" })
  const [sent, setSent] = useState(false)

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "0.7rem", letterSpacing: "0.12em",
    textTransform: "uppercase", marginBottom: "0.4rem",
    color: palette.mutedText, fontFamily: "system-ui, sans-serif",
  }
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem", fontSize: "0.9rem",
    border: `1px solid ${palette.border}`,
    backgroundColor: palette.inputBg,
    color: palette.darkText,
    fontFamily: "system-ui, sans-serif", outline: "none",
  }

  if (sent) return (
    <div style={{
      padding: "3rem 2rem", textAlign: "center",
      backgroundColor: palette.surface, borderRadius: "2px",
    }}>
      <p style={{ fontSize: "1.3rem", fontWeight: 300, marginBottom: "0.75rem", color: palette.headingText }}>Thank you!</p>
      <p style={{ fontSize: "0.9rem", color: palette.mutedText, fontFamily: "system-ui, sans-serif" }}>We'll confirm your booking within 24 hours.</p>
    </div>
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
      <div>
        <label style={labelStyle}>Name</label>
        <input style={inputStyle} placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input style={inputStyle} type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      </div>
      <div>
        <label style={labelStyle}>Service</label>
        <input style={inputStyle} placeholder="e.g. Balayage & Color" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} />
      </div>
      <div>
        <label style={labelStyle}>Notes</label>
        <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "90px" }} placeholder="Preferred date, time, or anything else…" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      </div>
      <button
        onClick={() => { if (form.name && form.email) setSent(true) }}
        style={{
          width: "100%", padding: "0.9rem",
          backgroundColor: palette.ctaButton, color: palette.darkText,
          border: "none", fontSize: "0.8rem", fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase",
          fontFamily: "system-ui, sans-serif", cursor: "pointer",
          transition: "background-color 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = palette.ctaHover}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = palette.ctaButton}
      >
        Request Booking
      </button>
    </div>
  )
}

/* ── MAIN PAGE ── */
export default function Page() {
  const [paletteKey, setPaletteKey] = useState<PaletteKey>("warm-neutrals")
  const p = PALETTES[paletteKey]

  return (
    <div style={{
      backgroundColor: p.background, color: p.darkText,
      fontFamily: "Georgia, serif", overflowX: "hidden",
      transition: "background-color 0.4s, color 0.4s",
    }}>
      <style>{`
        .salon-hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 90vh; }
        .salon-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; }
        .salon-photos { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
        .salon-team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; }
        .salon-reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; }
        .salon-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .salon-book { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
        @media (max-width: 768px) {
          .salon-hero { grid-template-columns: 1fr; min-height: auto; }
          .salon-hero-img { display: none; }
          .salon-services-grid { grid-template-columns: 1fr; }
          .salon-photos { grid-template-columns: repeat(2, 1fr); }
          .salon-team-grid { grid-template-columns: 1fr; gap: 2rem; }
          .salon-reviews-grid { grid-template-columns: 1fr; gap: 2rem; }
          .salon-stats { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
          .salon-book { grid-template-columns: 1fr; gap: 3rem; }
        }
      `}</style>

      {/* ─── NAV ─── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2.5rem", height: "4.5rem",
        backgroundColor: p.navBg,
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${p.border}`,
        transition: "all 0.4s",
      }}>
        <span style={{ fontSize: "1.1rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 300, color: p.primaryBrand }}>Velour</span>
        <nav style={{ display: "flex", gap: "2rem", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: p.mutedText, fontFamily: "system-ui, sans-serif", alignItems: "center" }}>
          <a href="#services" style={{ color: "inherit", textDecoration: "none" }}>Services</a>
          <a href="#team" style={{ color: "inherit", textDecoration: "none" }}>Team</a>
          <a href="#book" style={{ color: "inherit", textDecoration: "none" }}>Book</a>
          <PaletteSwitcher current={paletteKey} onChange={setPaletteKey} />
        </nav>
        <a href="#book" style={{
          fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase",
          padding: "0.6rem 1.4rem", backgroundColor: p.primaryBrand, color: p.isDark ? p.background : "#fff",
          textDecoration: "none", fontFamily: "system-ui, sans-serif",
          transition: "background-color 0.3s",
        }}>Book Now</a>
      </header>

      {/* ─── HERO ─── */}
      <section className="salon-hero">
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 2.5rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.5em", textTransform: "uppercase", color: p.primaryBrand, marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif" }}>Beauty · Wellness · Care</p>
          <h1 style={{ fontSize: "clamp(3rem, 5vw, 5rem)", fontWeight: 300, lineHeight: 1.05, marginBottom: "2rem", letterSpacing: "-0.01em", color: p.headingText }}>
            You deserve<br />to feel<br /><em>radiant.</em>
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, color: p.mutedText, maxWidth: "28rem", marginBottom: "2.5rem", fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
            Velour is a boutique beauty studio in the heart of the city.
            We believe every visit should leave you feeling restored — not just styled.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#book" style={{
              fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "0.9rem 2.2rem", backgroundColor: p.ctaButton, color: p.darkText,
              textDecoration: "none", fontFamily: "system-ui, sans-serif",
              transition: "background-color 0.3s",
            }}>Book a Service</a>
            <a href="#services" style={{
              fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "0.9rem 2.2rem", border: `1px solid ${p.border}`, color: p.mutedText,
              textDecoration: "none", fontFamily: "system-ui, sans-serif",
            }}>View Services</a>
          </div>
        </div>
        <div className="salon-hero-img" style={{ position: "relative", overflow: "hidden" }}>
          <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80" alt="Salon interior" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${p.heroGradient} 0%, transparent 15%)` }} />
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ borderTop: `1px solid ${p.border}`, borderBottom: `1px solid ${p.border}`, backgroundColor: p.surface, padding: "2rem 0", transition: "all 0.4s" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="salon-stats" style={{ textAlign: "center" }}>
            {[["8+", "Years in business"], ["2,400+", "Happy clients"], ["4.9★", "Average rating"]].map(([val, label]) => (
              <div key={label as string}>
                <p style={{ fontSize: "2rem", fontWeight: 300, color: p.primaryBrand, marginBottom: "0.25rem" }}>{val}</p>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: p.mutedText, fontFamily: "system-ui, sans-serif" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" style={{ maxWidth: "72rem", margin: "0 auto", padding: "6rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.primaryBrand, marginBottom: "1rem", fontFamily: "system-ui, sans-serif" }}>What We Offer</p>
          <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 300, color: p.headingText }}>Our Services</h2>
        </div>
        <div className="salon-services-grid" style={{ backgroundColor: p.border }}>
          {SERVICES.map(({ name, duration, price, desc }) => (
            <div key={name} style={{ backgroundColor: p.cardBg, padding: "2.5rem 2rem", transition: "background-color 0.4s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 400, color: p.headingText }}>{name}</h3>
                <span style={{ fontSize: "0.95rem", color: p.primaryBrand, fontFamily: "system-ui, sans-serif", whiteSpace: "nowrap", marginLeft: "1rem" }}>{price}</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: p.mutedText, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "system-ui, sans-serif", marginBottom: "0.75rem" }}>{duration}</p>
              <p style={{ fontSize: "0.9rem", color: p.mutedText, lineHeight: 1.6, fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section style={{ padding: "0 2rem 6rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div className="salon-photos">
            {GALLERY.map((src, i) => (
              <div key={i} style={{ aspectRatio: "1", overflow: "hidden" }}>
                <img src={src} alt={`Gallery ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section id="team" style={{ backgroundColor: p.surface, padding: "6rem 2rem", transition: "all 0.4s" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.primaryBrand, marginBottom: "1rem", fontFamily: "system-ui, sans-serif" }}>Meet the Artists</p>
            <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 300, color: p.headingText }}>Our Team</h2>
          </div>
          <div className="salon-team-grid">
            {TEAM.map(({ name, role, img }) => (
              <div key={name} style={{ textAlign: "center" }}>
                <div style={{ width: "100%", aspectRatio: "3/4", overflow: "hidden", marginBottom: "1.25rem" }}>
                  <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <p style={{ fontSize: "1.05rem", fontWeight: 400, marginBottom: "0.25rem", color: p.headingText }}>{name}</p>
                <p style={{ fontSize: "0.8rem", color: p.mutedText, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "system-ui, sans-serif" }}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section style={{ backgroundColor: p.reviewsBg, padding: "5rem 2rem", transition: "all 0.4s" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.primaryBrand, textAlign: "center", marginBottom: "3.5rem", fontFamily: "system-ui, sans-serif" }}>Client Love</p>
          <div className="salon-reviews-grid">
            {REVIEWS.map(({ text, name }) => (
              <div key={name}>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: p.reviewsText, fontStyle: "italic", marginBottom: "1.25rem" }}>"{text}"</p>
                <p style={{ fontSize: "0.8rem", color: p.reviewsMuted, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "system-ui, sans-serif" }}>— {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOOK ─── */}
      <section id="book" style={{ maxWidth: "56rem", margin: "0 auto", padding: "6rem 2rem" }}>
        <div className="salon-book">
          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.primaryBrand, marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif" }}>Ready?</p>
            <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 300, marginBottom: "1.5rem", lineHeight: 1.15, color: p.headingText }}>Book your visit.</h2>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: p.mutedText, fontFamily: "system-ui, sans-serif", fontWeight: 300, marginBottom: "2rem" }}>
              Fill out the form and we'll confirm your appointment within 24 hours. Walk-ins welcome Tuesday through Saturday.
            </p>
            <div style={{ fontSize: "0.85rem", color: p.mutedText, lineHeight: 2, fontFamily: "system-ui, sans-serif" }}>
              <p>Tue – Fri: 9am – 7pm</p>
              <p>Saturday: 9am – 6pm</p>
              <p>Sun – Mon: Closed</p>
              <p style={{ marginTop: "1rem" }}>hello@velour.studio</p>
            </div>
          </div>
          <BookingForm palette={p} />
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: `1px solid ${p.border}`, padding: "2rem 2.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: "0.75rem", color: p.mutedText, fontFamily: "system-ui, sans-serif",
        transition: "all 0.4s",
      }}>
        <span style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Georgia, serif", color: p.primaryBrand }}>Velour</span>
        <span>© 2025 Velour Studio</span>
      </footer>
    </div>
  )
}