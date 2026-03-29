"use client"

import { useState } from "react"

/* ── 1 PORTFOLIO COLOR PALETTE ── */
const PALETTES = {
  "minimal-neutral": {
    label: "Minimal Neutral",
    swatch: "#C9B59C",
    isDark: false,
    background: "#F9F8F6",
    surface: "#EFE9E3",
    primaryBrand: "#C9B59C",
    secondaryBrand: "#D9CFC7",
    accent: "#C9B59C",
    headingText: "#C9B59C",
    bodyText: "#C9B59C",
    mutedText: "#C9B59C",
    border: "#C9B59C",
    ctaButton: "#C9B59C",
    ctaHover: "#D9CFC7",
    // Derived
    navBg: "rgba(249,248,246,0.92)",
    darkText: "#141210",
    darkBg: "#141210",
    darkSurface: "#1e1c19",
    darkMuted: "#6b6560",
    darkBorder: "rgba(255,255,255,0.1)",
    lightMuted: "#a09890",
    lightBorder: "#d9d3ca",
    hoverBg: "#ede8e0",
    contactBg: "#EFE9E3",
    statusDot: "#10b981",
    inputBg: "#F9F8F6",
    inputBorder: "#D9CFC7",
    skillBorder: "rgba(255,255,255,0.1)",
    skillHoverBorder: "rgba(255,255,255,0.3)",
  },
} as const

type PaletteKey = keyof typeof PALETTES

/* ── CONTENT DATA ── */
const WORK = [
  { title: "Verdant Studio", category: "Brand Identity + Web", year: "2024", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80" },
  { title: "Petal Commerce", category: "E-commerce · Next.js", year: "2024", img: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80" },
  { title: "Nomad Finance", category: "Dashboard · Design System", year: "2023", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
  { title: "Forma Architects", category: "Web + CMS", year: "2023", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" },
]

const SERVICES = [
  { title: "Web Design", desc: "Sites that reflect your brand and convert visitors into clients." },
  { title: "Development", desc: "Next.js, TypeScript, headless CMS. Fast, scalable, maintainable." },
  { title: "Design Systems", desc: "Component libraries and style guides your team can actually use." },
]

const SKILLS = ["Next.js", "TypeScript", "Tailwind CSS", "Figma", "Node.js", "PostgreSQL", "Framer Motion", "Vercel"]

/* ── CONTACT FORM (inline, no @cindiweb/ui dependency) ── */
function ContactForm({ palette }: { palette: typeof PALETTES[PaletteKey] }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const p = palette

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "0.7rem", letterSpacing: "0.12em",
    textTransform: "uppercase", marginBottom: "0.4rem",
    color: p.lightMuted, fontFamily: "system-ui, sans-serif",
  }
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem", fontSize: "0.9rem",
    border: `1px solid ${p.inputBorder}`,
    backgroundColor: p.inputBg, color: p.darkText,
    fontFamily: "system-ui, sans-serif", outline: "none",
    boxSizing: "border-box",
  }

  if (sent) return (
    <div style={{ padding: "3rem 2rem", textAlign: "center", backgroundColor: p.surface, borderRadius: "2px" }}>
      <p style={{ fontSize: "1.3rem", fontWeight: 500, marginBottom: "0.5rem", color: p.darkText }}>Thanks!</p>
      <p style={{ fontSize: "0.9rem", color: p.lightMuted }}>We'll be in touch shortly.</p>
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
        <label style={labelStyle}>Message</label>
        <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "110px" }} placeholder="Tell me about your project…" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      </div>
      <button
        onClick={() => { if (form.name && form.email && form.message) setSent(true) }}
        style={{
          width: "100%", padding: "0.85rem",
          backgroundColor: p.darkText, color: p.background,
          border: "none", fontSize: "0.85rem", fontWeight: 600,
          letterSpacing: "0.05em", fontFamily: "system-ui, sans-serif",
          cursor: "pointer", transition: "background-color 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = p.darkSurface}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = p.darkText}
      >
        Send Message
      </button>
    </div>
  )
}

/* ── WORK ITEM (needs hover state) ── */
function WorkItem({ title, category, year, img, index, palette }: {
  title: string; category: string; year: string; img: string; index: number;
  palette: typeof PALETTES[PaletteKey]
}) {
  const [hovered, setHovered] = useState(false)
  const p = palette

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "1.5rem",
        padding: "1.5rem", margin: "0 -1.5rem",
        cursor: "pointer",
        backgroundColor: hovered ? p.hoverBg : "transparent",
        borderBottom: `1px solid ${p.lightBorder}`,
        transition: "background-color 0.2s",
      }}
    >
      <span style={{ fontSize: "0.75rem", color: p.secondaryBrand, width: "2rem", flexShrink: 0 }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div style={{
        width: "4rem", height: "3rem", overflow: "hidden", flexShrink: 0,
        opacity: hovered ? 1 : 0, transition: "opacity 0.25s",
      }}>
        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <h3 style={{
        fontSize: "clamp(1.2rem, 2vw, 1.5rem)", fontWeight: 500, flex: 1,
        color: p.darkText,
        transform: hovered ? "translateX(4px)" : "none", transition: "transform 0.2s",
      }}>{title}</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem", fontSize: "0.875rem", color: p.lightMuted }}>
        <span>{category}</span>
        <span>{year}</span>
      </div>
      <span style={{ color: hovered ? p.darkText : p.lightMuted, transition: "color 0.2s" }}>→</span>
    </div>
  )
}

/* ── MAIN PAGE ── */
export default function Page() {
  const [paletteKey] = useState<PaletteKey>("minimal-neutral")
  const p = PALETTES[paletteKey]

  return (
    <div style={{
      backgroundColor: p.background, color: p.darkText,
      fontFamily: "system-ui, sans-serif", overflowX: "hidden",
      transition: "background-color 0.4s, color 0.4s",
    }}>
      <style>{`
        .pf-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; }
        .pf-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; }
        @media (max-width: 768px) {
          .pf-services-grid { grid-template-columns: 1fr; gap: 2rem; }
          .pf-contact-grid { grid-template-columns: 1fr; gap: 3rem; }
          .pf-work-meta { display: none !important; }
        }
      `}</style>

      {/* ─── NAV ─── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: p.navBg, backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${p.lightBorder}`,
      }}>
        <div style={{
          maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem",
          height: "4rem", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontWeight: 700, fontSize: "0.875rem", letterSpacing: "-0.01em", color: p.darkText }}>Alex Mora</span>
          <nav style={{ display: "flex", alignItems: "center", gap: "2rem", fontSize: "0.875rem", color: p.darkMuted }}>
            <a href="#work" style={{ color: "inherit", textDecoration: "none" }}>Work</a>
            <a href="#services" style={{ color: "inherit", textDecoration: "none" }}>Services</a>
            <a href="#contact" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
          </nav>
          <a href="#contact" style={{
            fontSize: "0.875rem", backgroundColor: p.darkText, color: p.background,
            padding: "0.6rem 1.25rem", textDecoration: "none",
            transition: "background-color 0.2s",
          }}>Hire me</a>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section style={{ maxWidth: "72rem", margin: "0 auto", padding: "7rem 1.5rem 5rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontSize: "0.75rem", color: p.darkMuted,
            border: `1px solid ${p.lightBorder}`,
            padding: "0.35rem 0.75rem",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: p.statusDot }} />
            Available for new projects
          </span>
        </div>

        <h1 style={{
          fontSize: "clamp(3.5rem, 15vw, 11vw)", fontWeight: 700,
          lineHeight: 0.92, letterSpacing: "-0.03em",
          color: p.darkText, marginBottom: "2rem",
        }}>
          Designer<br />&amp; Developer
        </h1>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1.5rem", flexWrap: "wrap" }}>
          <p style={{ fontSize: "1rem", color: p.darkMuted, lineHeight: 1.6, maxWidth: "28rem" }}>
            I build websites and digital products for ambitious brands. Based in San Juan, PR. Working globally.
          </p>
          <a href="#work" style={{
            fontSize: "0.875rem", textDecoration: "underline", textUnderlineOffset: "4px",
            color: p.darkMuted, whiteSpace: "nowrap",
          }}>View Work ↓</a>
        </div>
      </section>

      {/* ─── SELECTED WORK ─── */}
      <section id="work" style={{ borderTop: `1px solid ${p.lightBorder}`, padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.lightMuted }}>Selected Work</h2>
            <span style={{ fontSize: "0.75rem", color: p.lightMuted }}>{WORK.length} Projects</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {WORK.map((project, i) => (
              <WorkItem key={project.title} {...project} index={i} palette={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" style={{
        backgroundColor: p.darkBg, color: p.background,
        padding: "7rem 1.5rem",
        transition: "background-color 0.4s",
      }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <h2 style={{ fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.darkMuted, marginBottom: "4rem" }}>What I Do</h2>
          <div className="pf-services-grid">
            {SERVICES.map(({ title, desc }) => (
              <div key={title}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 500, marginBottom: "1rem", color: p.background }}>{title}</h3>
                <p style={{ fontSize: "0.875rem", color: p.lightMuted, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "5rem", paddingTop: "3rem", borderTop: `1px solid ${p.darkBorder}` }}>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.darkMuted, marginBottom: "1.5rem" }}>Tools & Technologies</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {SKILLS.map((skill) => (
                <span key={skill} style={{
                  fontSize: "0.875rem", padding: "0.5rem 1rem",
                  border: `1px solid ${p.skillBorder}`,
                  color: p.lightMuted, cursor: "default",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = p.skillHoverBorder; e.currentTarget.style.color = p.background }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = p.skillBorder; e.currentTarget.style.color = p.lightMuted }}
                >{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      <section style={{ borderTop: `1px solid ${p.lightBorder}`, padding: "7rem 1.5rem" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 300, lineHeight: 1.6, color: p.darkText, fontStyle: "italic", marginBottom: "2rem" }}>
            "Alex took our brand from a messy Squarespace to a site that actually reflects who we are. The whole process was smooth and the result exceeded every expectation."
          </p>
          <p style={{ fontSize: "0.875rem", color: p.lightMuted }}>— Sofia R., CEO at Verdant Studio</p>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" style={{
        backgroundColor: p.contactBg,
        borderTop: `1px solid ${p.lightBorder}`,
        padding: "7rem 1.5rem",
        transition: "background-color 0.4s",
      }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div className="pf-contact-grid">
            <div>
              <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.5rem", color: p.darkText }}>
                Let's build<br />something great.
              </h2>
              <p style={{ fontSize: "0.875rem", color: p.darkMuted, lineHeight: 1.6, marginBottom: "2.5rem", maxWidth: "22rem" }}>
                I take on a small number of projects each quarter to keep quality high. If you have something interesting, let's talk.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.875rem", color: p.darkMuted }}>
                <a href="mailto:hello@alexmora.co" style={{ color: "inherit", textDecoration: "none" }}>hello@alexmora.co</a>
                <a href="#" style={{ color: "inherit", textDecoration: "none" }}>LinkedIn →</a>
              </div>
            </div>
            <ContactForm palette={p} />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: `1px solid ${p.lightBorder}`,
        padding: "2rem 1.5rem",
      }}>
        <div style={{
          maxWidth: "72rem", margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: "0.75rem", color: p.lightMuted,
        }}>
          <span>Alex Mora</span>
          <span>© 2025 · All rights reserved</span>
        </div>
      </footer>
    </div>
  )
}