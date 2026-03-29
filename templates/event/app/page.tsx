"use client"

import { useState } from "react"

/* ── 4 EVENT COLOR PALETTES (all dark) ── */
const PALETTES = {
  "high-energy": {
    label: "High Energy",
    swatch: "#FF8F00",
    background: "#26355D",
    surface: "#AF47D2",
    primaryBrand: "#FF8F00",
    secondaryBrand: "#FFDB00",
    accent: "#FF8F00",
    headingText: "#FFDB00",
    bodyText: "#FF8F00",
    mutedText: "#FF8F00",
    border: "#AF47D2",
    ctaButton: "#FF8F00",
    ctaHover: "#FFDB00",
    // Derived
    navBg: "rgba(38,53,93,0.92)",
    navBorder: "rgba(255,143,0,0.12)",
    text: "#FFDB00",
    muted: "rgba(255,143,0,0.6)",
    dim: "rgba(255,219,0,0.35)",
    heroGlow: "rgba(255,143,0,0.15)",
    heroGridColor: "rgba(255,143,0,0.06)",
    heroGradient: "linear-gradient(135deg, #FFDB00 0%, #FF8F00 60%, #AF47D2 100%)",
    badgeBorder: "rgba(255,143,0,0.35)",
    badgeText: "#FF8F00",
    statsBg: "rgba(255,143,0,0.04)",
    statsBorder: "rgba(255,143,0,0.1)",
    statsValue: "#FF8F00",
    cardBg: "rgba(255,143,0,0.03)",
    cardBorder: "rgba(255,143,0,0.1)",
    speakerRing: "rgba(255,143,0,0.35)",
    ticketFeaturedBg: "rgba(255,143,0,0.06)",
    ticketFeaturedGlow: "rgba(255,143,0,0.15)",
    ticketFeaturedBorder: "#FF8F00",
    ticketBuyBg: "#FF8F00",
    ticketBuyText: "#26355D",
    footerBg: "#1a2540",
    // Schedule type dots
    typeKeynote: "#FF8F00",
    typePanel: "#FFDB00",
    typeSession: "#AF47D2",
    typeBreak: "#6b7280",
    typeSocial: "#FFDB00",
  },
  "bold-gradients": {
    label: "Bold Gradients",
    swatch: "#008BFF",
    background: "#362F4F",
    surface: "#5B23FF",
    primaryBrand: "#008BFF",
    secondaryBrand: "#E4FF30",
    accent: "#008BFF",
    headingText: "#E4FF30",
    bodyText: "#E4FF30",
    mutedText: "#008BFF",
    border: "#5B23FF",
    ctaButton: "#008BFF",
    ctaHover: "#E4FF30",
    navBg: "rgba(54,47,79,0.92)",
    navBorder: "rgba(0,139,255,0.12)",
    text: "#E4FF30",
    muted: "rgba(0,139,255,0.65)",
    dim: "rgba(228,255,48,0.3)",
    heroGlow: "rgba(0,139,255,0.15)",
    heroGridColor: "rgba(0,139,255,0.06)",
    heroGradient: "linear-gradient(135deg, #E4FF30 0%, #008BFF 60%, #5B23FF 100%)",
    badgeBorder: "rgba(0,139,255,0.35)",
    badgeText: "#008BFF",
    statsBg: "rgba(0,139,255,0.04)",
    statsBorder: "rgba(0,139,255,0.1)",
    statsValue: "#008BFF",
    cardBg: "rgba(0,139,255,0.03)",
    cardBorder: "rgba(0,139,255,0.1)",
    speakerRing: "rgba(0,139,255,0.35)",
    ticketFeaturedBg: "rgba(0,139,255,0.06)",
    ticketFeaturedGlow: "rgba(0,139,255,0.15)",
    ticketFeaturedBorder: "#008BFF",
    ticketBuyBg: "#008BFF",
    ticketBuyText: "#362F4F",
    footerBg: "#2a2540",
    typeKeynote: "#008BFF",
    typePanel: "#E4FF30",
    typeSession: "#5B23FF",
    typeBreak: "#6b7280",
    typeSocial: "#E4FF30",
  },
  "neon-accent": {
    label: "Neon Accent",
    swatch: "#892CDC",
    background: "#000000",
    surface: "#52057B",
    primaryBrand: "#892CDC",
    secondaryBrand: "#BC6FF1",
    accent: "#52057B",
    headingText: "#BC6FF1",
    bodyText: "#BC6FF1",
    mutedText: "#892CDC",
    border: "#52057B",
    ctaButton: "#892CDC",
    ctaHover: "#BC6FF1",
    navBg: "rgba(0,0,0,0.92)",
    navBorder: "rgba(137,44,220,0.15)",
    text: "#BC6FF1",
    muted: "rgba(137,44,220,0.65)",
    dim: "rgba(188,111,241,0.3)",
    heroGlow: "rgba(137,44,220,0.2)",
    heroGridColor: "rgba(137,44,220,0.06)",
    heroGradient: "linear-gradient(135deg, #BC6FF1 0%, #892CDC 60%, #52057B 100%)",
    badgeBorder: "rgba(137,44,220,0.35)",
    badgeText: "#892CDC",
    statsBg: "rgba(137,44,220,0.04)",
    statsBorder: "rgba(137,44,220,0.1)",
    statsValue: "#892CDC",
    cardBg: "rgba(137,44,220,0.03)",
    cardBorder: "rgba(137,44,220,0.1)",
    speakerRing: "rgba(137,44,220,0.35)",
    ticketFeaturedBg: "rgba(137,44,220,0.08)",
    ticketFeaturedGlow: "rgba(137,44,220,0.2)",
    ticketFeaturedBorder: "#892CDC",
    ticketBuyBg: "#892CDC",
    ticketBuyText: "#000000",
    footerBg: "#050005",
    typeKeynote: "#892CDC",
    typePanel: "#BC6FF1",
    typeSession: "#52057B",
    typeBreak: "#333333",
    typeSocial: "#BC6FF1",
  },
  "blue-magenta": {
    label: "Blue / Magenta",
    swatch: "#FF85B3",
    background: "#4700D8",
    surface: "#9900F0",
    primaryBrand: "#FF85B3",
    secondaryBrand: "#F900BF",
    accent: "#FF85B3",
    headingText: "#FF85B3",
    bodyText: "#FF85B3",
    mutedText: "#FF85B3",
    border: "#9900F0",
    ctaButton: "#FF85B3",
    ctaHover: "#F900BF",
    navBg: "rgba(71,0,216,0.92)",
    navBorder: "rgba(255,133,179,0.12)",
    text: "#FF85B3",
    muted: "rgba(255,133,179,0.6)",
    dim: "rgba(255,133,179,0.3)",
    heroGlow: "rgba(255,133,179,0.15)",
    heroGridColor: "rgba(255,133,179,0.05)",
    heroGradient: "linear-gradient(135deg, #FF85B3 0%, #F900BF 60%, #9900F0 100%)",
    badgeBorder: "rgba(255,133,179,0.35)",
    badgeText: "#FF85B3",
    statsBg: "rgba(255,133,179,0.04)",
    statsBorder: "rgba(255,133,179,0.1)",
    statsValue: "#FF85B3",
    cardBg: "rgba(255,133,179,0.03)",
    cardBorder: "rgba(255,133,179,0.1)",
    speakerRing: "rgba(255,133,179,0.35)",
    ticketFeaturedBg: "rgba(255,133,179,0.06)",
    ticketFeaturedGlow: "rgba(255,133,179,0.15)",
    ticketFeaturedBorder: "#FF85B3",
    ticketBuyBg: "#FF85B3",
    ticketBuyText: "#4700D8",
    footerBg: "#3500a8",
    typeKeynote: "#FF85B3",
    typePanel: "#F900BF",
    typeSession: "#9900F0",
    typeBreak: "rgba(255,133,179,0.25)",
    typeSocial: "#F900BF",
  },
} as const

type PaletteKey = keyof typeof PALETTES

/* ── CONTENT DATA ── */
const SPEAKERS = [
  { name: "Priya Kapoor", role: "CEO, Lattice AI", topic: "The next wave of human-machine collaboration", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { name: "Marcus Chen", role: "Partner, Andreessen Horowitz", topic: "What founders get wrong about product-market fit", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Yara Osei", role: "Design Lead, Linear", topic: "Craft at scale: shipping beautiful products fast", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80" },
  { name: "Tom Bellamy", role: "Co-founder, Vercel", topic: "The platform era and what comes next", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
  { name: "Aisha Rahman", role: "Staff Eng, Stripe", topic: "Infrastructure decisions that compound over time", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
  { name: "Leo Fontaine", role: "Founder, Raycast", topic: "Building tools people love to open every morning", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
]

const SCHEDULE: { time: string; title: string; type: string; room?: string }[] = [
  { time: "8:00 AM", title: "Registration & Breakfast", type: "break" },
  { time: "9:00 AM", title: "Opening Keynote — Priya Kapoor", type: "keynote", room: "Main Stage" },
  { time: "10:15 AM", title: "Track Sessions — Choose Your Path", type: "session", room: "Rooms A, B, C" },
  { time: "12:00 PM", title: "Lunch & Networking", type: "break" },
  { time: "1:30 PM", title: "Panel: Building in the AI Era", type: "panel", room: "Main Stage" },
  { time: "3:00 PM", title: "Workshop Blocks", type: "session", room: "Rooms A, B" },
  { time: "4:30 PM", title: "Fireside Chat — Marcus Chen", type: "keynote", room: "Main Stage" },
  { time: "6:00 PM", title: "Rooftop Reception & Demos", type: "social" },
]

const TICKETS = [
  { tier: "General", price: "$299", perks: ["Full conference access", "Lunch included", "Talk recordings"], featured: false },
  { tier: "Pro", price: "$599", perks: ["Everything in General", "Workshop access", "Speaker dinner", "Priority seating"], featured: true },
  { tier: "Team (5 seats)", price: "$2,200", perks: ["5 Pro passes", "Private table at dinner", "Company listing in program", "Invoice billing"], featured: false },
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
          background: "none", border: `1px solid ${p.navBorder}`,
          borderRadius: "100px", padding: "0.3rem 0.7rem 0.3rem 0.45rem",
          cursor: "pointer", fontSize: "0.6rem",
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: p.muted, fontFamily: "system-ui, sans-serif",
          transition: "all 0.2s",
        }}
      >
        <span style={{
          width: 12, height: 12, borderRadius: "50%",
          backgroundColor: p.primaryBrand,
          border: "2px solid rgba(255,255,255,0.1)",
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
            backgroundColor: p.background,
            border: `1px solid ${p.cardBorder}`,
            borderRadius: "8px", padding: "0.5rem",
            zIndex: 99, minWidth: "180px",
            boxShadow: `0 8px 32px rgba(0,0,0,0.4)`,
          }}>
            {(Object.entries(PALETTES) as [PaletteKey, typeof PALETTES[PaletteKey]][]).map(([key, pal]) => (
              <button
                key={key}
                onClick={() => { onChange(key); setOpen(false) }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  width: "100%", padding: "0.45rem 0.55rem",
                  background: key === current ? `${p.cardBg}` : "transparent",
                  border: "none", borderRadius: "5px",
                  cursor: "pointer", textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => { if (key !== current) e.currentTarget.style.background = p.cardBg }}
                onMouseLeave={e => { if (key !== current) e.currentTarget.style.background = "transparent" }}
              >
                <div style={{ display: "flex", gap: "2px" }}>
                  {[pal.primaryBrand, pal.secondaryBrand, pal.background].map((c, i) => (
                    <span key={i} style={{
                      width: 11, height: 11, borderRadius: "50%",
                      backgroundColor: c,
                      border: "1.5px solid rgba(255,255,255,0.12)",
                    }} />
                  ))}
                </div>
                <span style={{
                  fontSize: "0.65rem", color: p.text,
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: key === current ? 600 : 400,
                  opacity: key === current ? 1 : 0.65,
                }}>{pal.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ── MAIN PAGE ── */
export default function Page() {
  const [paletteKey, setPaletteKey] = useState<PaletteKey>("high-energy")
  const p = PALETTES[paletteKey]

  const typeColors: Record<string, string> = {
    keynote: p.typeKeynote, panel: p.typePanel, session: p.typeSession,
    break: p.typeBreak, social: p.typeSocial,
  }

  return (
    <div style={{
      backgroundColor: p.background, color: p.text,
      fontFamily: "system-ui, sans-serif", overflowX: "hidden",
      transition: "background-color 0.4s, color 0.4s",
    }}>
      <style>{`
        .ev-speakers-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .ev-tickets-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; align-items: start; }
        .ev-venue-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .ev-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; text-align: center; }
        .ev-countdown { display: flex; gap: 2.5rem; justify-content: center; margin-top: 5rem; }
        @media (max-width: 768px) {
          .ev-speakers-grid { grid-template-columns: 1fr; }
          .ev-tickets-grid { grid-template-columns: 1fr; }
          .ev-venue-grid { grid-template-columns: 1fr; }
          .ev-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .ev-countdown { gap: 1.5rem; margin-top: 3rem; }
        }
      `}</style>

      {/* ─── NAV ─── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: p.navBg, backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${p.navBorder}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2.5rem", height: "4.5rem",
        transition: "all 0.4s",
      }}>
        <span style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: p.text }}>
          Forge<span style={{ color: p.primaryBrand }}>.</span>25
        </span>
        <nav style={{ display: "flex", gap: "2rem", fontSize: "0.85rem", color: p.muted, alignItems: "center" }}>
          <a href="#speakers" style={{ color: "inherit", textDecoration: "none" }}>Speakers</a>
          <a href="#schedule" style={{ color: "inherit", textDecoration: "none" }}>Schedule</a>
          <a href="#tickets" style={{ color: "inherit", textDecoration: "none" }}>Tickets</a>
          <PaletteSwitcher current={paletteKey} onChange={setPaletteKey} />
        </nav>
        <a href="#tickets" style={{
          backgroundColor: p.ctaButton, color: p.ticketBuyText,
          padding: "0.6rem 1.4rem", textDecoration: "none",
          fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.05em",
          transition: "background-color 0.3s",
        }}>Get Tickets</a>
      </header>

      {/* ─── HERO ─── */}
      <section style={{ position: "relative", minHeight: "95vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${p.heroGridColor} 1px, transparent 1px), linear-gradient(90deg, ${p.heroGridColor} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: "600px", height: "400px",
          background: `radial-gradient(ellipse, ${p.heroGlow} 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", maxWidth: "72rem", margin: "0 auto", padding: "6rem 2.5rem", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            border: `1px solid ${p.badgeBorder}`,
            padding: "0.4rem 1rem", marginBottom: "2.5rem", borderRadius: 999,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: p.primaryBrand, display: "inline-block" }} />
            <span style={{ fontSize: "0.78rem", color: p.badgeText, letterSpacing: "0.1em" }}>San Francisco · May 14–15, 2025</span>
          </div>
          <h1 style={{
            fontSize: "clamp(3.5rem, 8vw, 8rem)", fontWeight: 900,
            lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: "2rem",
            background: p.heroGradient,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            FORGE<br />2025
          </h1>
          <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: p.muted, lineHeight: 1.6, maxWidth: "38rem", margin: "0 auto 3rem" }}>
            Two days. 24 speakers. One room full of people who actually ship things.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#tickets" style={{
              backgroundColor: p.ctaButton, color: p.ticketBuyText,
              padding: "1rem 2.5rem", textDecoration: "none",
              fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.05em",
            }}>Get Your Ticket →</a>
            <a href="#speakers" style={{
              border: "1px solid rgba(255,255,255,0.15)", color: p.text,
              padding: "1rem 2.5rem", textDecoration: "none", fontSize: "0.9rem",
            }}>See Speakers</a>
          </div>
          <div className="ev-countdown">
            {[["64", "Days"], ["14", "Hours"], ["32", "Minutes"], ["09", "Seconds"]].map(([val, unit]) => (
              <div key={unit} style={{ textAlign: "center" }}>
                <p style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: p.text, lineHeight: 1 }}>{val}</p>
                <p style={{ fontSize: "0.7rem", color: p.dim, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.5rem" }}>{unit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{
        borderTop: `1px solid ${p.statsBorder}`, borderBottom: `1px solid ${p.statsBorder}`,
        backgroundColor: p.statsBg, padding: "2.5rem 0",
        transition: "all 0.4s",
      }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="ev-stats-grid">
            {[["24", "Speakers"], ["800+", "Attendees"], ["3", "Tracks"], ["2", "Days"]].map(([val, label]) => (
              <div key={label}>
                <p style={{ fontSize: "2rem", fontWeight: 800, color: p.statsValue, letterSpacing: "-0.03em" }}>{val}</p>
                <p style={{ fontSize: "0.72rem", color: p.dim, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.25rem" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPEAKERS ─── */}
      <section id="speakers" style={{ maxWidth: "72rem", margin: "0 auto", padding: "6rem 2rem" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", color: p.primaryBrand, marginBottom: "0.75rem" }}>Lineup</p>
          <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", color: p.headingText }}>Speakers</h2>
        </div>
        <div className="ev-speakers-grid">
          {SPEAKERS.map(({ name, role, topic, img }) => (
            <div key={name} style={{
              border: `1px solid ${p.cardBorder}`,
              backgroundColor: p.cardBg, padding: "1.75rem",
              transition: "all 0.4s",
            }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.25rem" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  overflow: "hidden", flexShrink: 0,
                  border: `2px solid ${p.speakerRing}`,
                }}>
                  <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.95rem", color: p.text }}>{name}</p>
                  <p style={{ fontSize: "0.78rem", color: p.muted, marginTop: "0.1rem" }}>{role}</p>
                </div>
              </div>
              <p style={{ fontSize: "0.85rem", color: p.muted, lineHeight: 1.5, fontStyle: "italic" }}>"{topic}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SCHEDULE ─── */}
      <section id="schedule" style={{
        borderTop: `1px solid ${p.statsBorder}`,
        padding: "6rem 2rem", backgroundColor: p.statsBg,
        transition: "all 0.4s",
      }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", color: p.primaryBrand, marginBottom: "0.75rem" }}>Day 1 — May 14</p>
            <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", color: p.headingText }}>Schedule</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {SCHEDULE.map(({ time, title, type, room }, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "6rem 1fr", gap: "1.5rem",
                alignItems: "start", padding: "1.25rem 0",
                borderBottom: `1px solid ${p.cardBorder}`,
              }}>
                <span style={{ fontSize: "0.78rem", color: p.dim, paddingTop: "0.2rem" }}>{time}</span>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                    <span style={{
                      display: "inline-block", width: 6, height: 6, borderRadius: "50%",
                      backgroundColor: typeColors[type] || p.dim, flexShrink: 0,
                    }} />
                    <p style={{ fontSize: "0.95rem", fontWeight: 500, color: p.text }}>{title}</p>
                  </div>
                  {room && <p style={{ fontSize: "0.75rem", color: p.dim, marginTop: "0.3rem", marginLeft: "1rem" }}>{room}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TICKETS ─── */}
      <section id="tickets" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", color: p.primaryBrand, marginBottom: "0.75rem" }}>Join Us</p>
            <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", color: p.headingText }}>Tickets</h2>
            <p style={{ fontSize: "0.9rem", color: p.muted, marginTop: "0.75rem" }}>Early bird pricing ends April 1st</p>
          </div>
          <div className="ev-tickets-grid">
            {TICKETS.map(({ tier, price, perks, featured }) => (
              <div key={tier} style={{
                position: "relative", padding: "2rem",
                border: featured ? `1px solid ${p.ticketFeaturedBorder}` : `1px solid ${p.cardBorder}`,
                backgroundColor: featured ? p.ticketFeaturedBg : p.cardBg,
                boxShadow: featured ? `0 0 40px ${p.ticketFeaturedGlow}` : "none",
                transition: "all 0.4s",
              }}>
                {featured && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    backgroundColor: p.ctaButton, color: p.ticketBuyText,
                    fontSize: "0.7rem", fontWeight: 800, padding: "3px 12px",
                    letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap",
                  }}>Most popular</div>
                )}
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: p.muted, marginBottom: "1rem" }}>{tier}</p>
                <p style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "1.5rem", color: featured ? p.primaryBrand : p.text }}>{price}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: 10 }}>
                  {perks.map((perk) => (
                    <li key={perk} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: "0.85rem", color: p.muted }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={featured ? p.primaryBrand : p.dim} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {perk}
                    </li>
                  ))}
                </ul>
                <button style={{
                  width: "100%", padding: "0.85rem",
                  backgroundColor: featured ? p.ticketBuyBg : "transparent",
                  border: featured ? "none" : `1px solid ${p.cardBorder}`,
                  color: featured ? p.ticketBuyText : p.text,
                  fontSize: "0.85rem", fontWeight: 700, cursor: "pointer",
                  letterSpacing: "0.05em", fontFamily: "system-ui, sans-serif",
                  transition: "all 0.3s",
                }}>Buy Ticket</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VENUE ─── */}
      <section style={{
        borderTop: `1px solid ${p.statsBorder}`,
        padding: "5rem 2rem", backgroundColor: p.statsBg,
        transition: "all 0.4s",
      }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <div className="ev-venue-grid">
            <div>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", color: p.primaryBrand, marginBottom: "1rem" }}>Venue</p>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "1.25rem", color: p.headingText }}>
                The Armory<br />San Francisco
              </h2>
              <p style={{ fontSize: "0.9rem", color: p.muted, lineHeight: 1.7, marginBottom: "1.5rem" }}>
                1800 Mission St, San Francisco, CA 94103. A converted historic venue with 10,000 sq ft of event space, breakout rooms, and a rooftop terrace.
              </p>
              <p style={{ fontSize: "0.82rem", color: p.dim, lineHeight: 2 }}>
                Doors open at 8:00 AM both days<br />Nearest BART: 16th St Mission
              </p>
            </div>
            <div style={{ aspectRatio: "1", overflow: "hidden" }}>
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80" alt="Venue" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: `1px solid ${p.statsBorder}`,
        backgroundColor: p.footerBg,
        padding: "2rem 2.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "1rem",
        fontSize: "0.78rem", color: p.dim,
        transition: "all 0.4s",
      }}>
        <span style={{ fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.1em", color: p.text }}>
          FORGE<span style={{ color: p.primaryBrand }}>.</span>25
        </span>
        <span>© 2025 Forge Conference</span>
        <a href="mailto:hello@forgeconf.com" style={{ color: p.muted, textDecoration: "none" }}>hello@forgeconf.com</a>
      </footer>
    </div>
  )
}