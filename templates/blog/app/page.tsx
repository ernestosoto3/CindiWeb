"use client"

import { useState } from "react"

/* ── 5 BLOG COLOR PALETTES ── */
const PALETTES = {
  "soft-neutrals": {
    label: "Soft Neutrals",
    swatch: "#1E201E",
    background: "#ECDFCC",
    surface: "#697565",
    primaryBrand: "#1E201E",
    secondaryBrand: "#3C3D37",
    accent: "#697565",
    headingText: "#1E201E",
    bodyText: "#1E201E",
    mutedText: "#3C3D37",
    border: "#3C3D37",
    ctaButton: "#697565",
    ctaHover: "#1E201E",
    navBg: "rgba(236,223,204,0.95)",
    navBorder: "#d4c8b0",
    muted: "#78716c",
    lightMuted: "#a8a29e",
    topicsBg: "#e2d5bc",
    topicBorder: "#d4c8b0",
    nlBg: "#1E201E",
    nlText: "#ECDFCC",
    nlMuted: "#697565",
    nlInputBorder: "rgba(236,223,204,0.15)",
    nlBtnBg: "#ECDFCC",
    nlBtnText: "#1E201E",
    nlSubMuted: "#52524e",
    footerBorder: "#d4c8b0",
    heroBtnBg: "#1E201E",
    heroBtnText: "#ECDFCC",
    subBtnBorder: "#1E201E",
    subBtnText: "#1E201E",
    loadBorder: "#d4c8b0",
    loadText: "#78716c",
  },
  "muted-blues": {
    label: "Muted Blues",
    swatch: "#98A8F8",
    background: "#FAF7F0",
    surface: "#CDFCF6",
    primaryBrand: "#98A8F8",
    secondaryBrand: "#BCCEF8",
    accent: "#CDFCF6",
    headingText: "#98A8F8",
    bodyText: "#98A8F8",
    mutedText: "#98A8F8",
    border: "#98A8F8",
    ctaButton: "#CDFCF6",
    ctaHover: "#98A8F8",
    navBg: "rgba(250,247,240,0.95)",
    navBorder: "#BCCEF8",
    muted: "#98A8F8",
    lightMuted: "#BCCEF8",
    topicsBg: "#f0ede5",
    topicBorder: "#BCCEF8",
    nlBg: "#3a3f6a",
    nlText: "#FAF7F0",
    nlMuted: "#BCCEF8",
    nlInputBorder: "rgba(250,247,240,0.18)",
    nlBtnBg: "#FAF7F0",
    nlBtnText: "#3a3f6a",
    nlSubMuted: "rgba(188,206,248,0.5)",
    footerBorder: "#BCCEF8",
    heroBtnBg: "#98A8F8",
    heroBtnText: "#FAF7F0",
    subBtnBorder: "#98A8F8",
    subBtnText: "#98A8F8",
    loadBorder: "#BCCEF8",
    loadText: "#98A8F8",
  },
  "warm-grey": {
    label: "Warm Grey",
    swatch: "#838383",
    background: "#FCCBCB",
    surface: "#D9ADAD",
    primaryBrand: "#838383",
    secondaryBrand: "#AD9D9D",
    accent: "#D9ADAD",
    headingText: "#838383",
    bodyText: "#838383",
    mutedText: "#838383",
    border: "#838383",
    ctaButton: "#D9ADAD",
    ctaHover: "#838383",
    navBg: "rgba(252,203,203,0.95)",
    navBorder: "#D9ADAD",
    muted: "#838383",
    lightMuted: "#AD9D9D",
    topicsBg: "#f0bfbf",
    topicBorder: "#D9ADAD",
    nlBg: "#4a4242",
    nlText: "#FCCBCB",
    nlMuted: "#AD9D9D",
    nlInputBorder: "rgba(252,203,203,0.18)",
    nlBtnBg: "#FCCBCB",
    nlBtnText: "#4a4242",
    nlSubMuted: "rgba(173,157,157,0.5)",
    footerBorder: "#D9ADAD",
    heroBtnBg: "#838383",
    heroBtnText: "#FCCBCB",
    subBtnBorder: "#838383",
    subBtnText: "#838383",
    loadBorder: "#D9ADAD",
    loadText: "#838383",
  },
  "off-white": {
    label: "Off-White",
    swatch: "#C9B59C",
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
    navBg: "rgba(249,248,246,0.95)",
    navBorder: "#D9CFC7",
    muted: "#C9B59C",
    lightMuted: "#D9CFC7",
    topicsBg: "#f0ebe4",
    topicBorder: "#D9CFC7",
    nlBg: "#3d3528",
    nlText: "#F9F8F6",
    nlMuted: "#C9B59C",
    nlInputBorder: "rgba(249,248,246,0.15)",
    nlBtnBg: "#F9F8F6",
    nlBtnText: "#3d3528",
    nlSubMuted: "rgba(201,181,156,0.45)",
    footerBorder: "#D9CFC7",
    heroBtnBg: "#C9B59C",
    heroBtnText: "#F9F8F6",
    subBtnBorder: "#C9B59C",
    subBtnText: "#C9B59C",
    loadBorder: "#D9CFC7",
    loadText: "#C9B59C",
  },
  "low-saturation": {
    label: "Low Saturation",
    swatch: "#CFAB8D",
    background: "#ECEEDF",
    surface: "#BBDCE5",
    primaryBrand: "#CFAB8D",
    secondaryBrand: "#D9C4B0",
    accent: "#BBDCE5",
    headingText: "#CFAB8D",
    bodyText: "#CFAB8D",
    mutedText: "#CFAB8D",
    border: "#CFAB8D",
    ctaButton: "#BBDCE5",
    ctaHover: "#CFAB8D",
    navBg: "rgba(236,238,223,0.95)",
    navBorder: "#D9C4B0",
    muted: "#CFAB8D",
    lightMuted: "#D9C4B0",
    topicsBg: "#e2e4d4",
    topicBorder: "#D9C4B0",
    nlBg: "#4a3d30",
    nlText: "#ECEEDF",
    nlMuted: "#D9C4B0",
    nlInputBorder: "rgba(236,238,223,0.15)",
    nlBtnBg: "#ECEEDF",
    nlBtnText: "#4a3d30",
    nlSubMuted: "rgba(217,196,176,0.45)",
    footerBorder: "#D9C4B0",
    heroBtnBg: "#CFAB8D",
    heroBtnText: "#ECEEDF",
    subBtnBorder: "#CFAB8D",
    subBtnText: "#CFAB8D",
    loadBorder: "#D9C4B0",
    loadText: "#CFAB8D",
  },
} as const

type PaletteKey = keyof typeof PALETTES

/* ── CONTENT DATA ── */
const FEATURED = {
  title: "The quiet art of doing less and noticing more",
  category: "Mindfulness",
  date: "March 8, 2025",
  readTime: "6 min read",
  excerpt: "We optimize, iterate, and ship — but we rarely ask what we lose in the relentless push forward. Here's what I found when I finally slowed down.",
  img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80",
}

const POSTS = [
  { title: "Why I deleted my productivity system", category: "Work", date: "Feb 28", readTime: "4 min", img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80" },
  { title: "On writing every day for a year", category: "Writing", date: "Feb 14", readTime: "7 min", img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80" },
  { title: "The tools I actually use in 2025", category: "Tools", date: "Jan 30", readTime: "5 min", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80" },
  { title: "How I stopped chasing metrics and started enjoying the work", category: "Creativity", date: "Jan 18", readTime: "8 min", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
]

const TOPICS = ["All", "Writing", "Work", "Mindfulness", "Tools", "Creativity", "Books"]

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
          <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, backgroundColor: p.background, border: `1px solid ${p.navBorder}`, borderRadius: "8px", padding: "0.5rem", zIndex: 99, minWidth: "185px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
            {(Object.entries(PALETTES) as [PaletteKey, typeof PALETTES[PaletteKey]][]).map(([key, pal]) => (
              <button key={key} onClick={() => { onChange(key); setOpen(false) }} style={{
                display: "flex", alignItems: "center", gap: "0.6rem", width: "100%", padding: "0.45rem 0.55rem",
                background: key === current ? p.surface : "transparent", border: "none", borderRadius: "5px",
                cursor: "pointer", textAlign: "left", transition: "background 0.15s",
              }}
                onMouseEnter={e => { if (key !== current) e.currentTarget.style.background = String(p.topicsBg) }}
                onMouseLeave={e => { if (key !== current) e.currentTarget.style.background = "transparent" }}
              >
                <div style={{ display: "flex", gap: "2px" }}>
                  {[pal.primaryBrand, pal.secondaryBrand, pal.background].map((c, i) => (
                    <span key={i} style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: c, border: "1.5px solid rgba(0,0,0,0.06)" }} />
                  ))}
                </div>
                <span style={{ fontSize: "0.65rem", color: p.headingText, fontFamily: "system-ui, sans-serif", fontWeight: key === current ? 600 : 400 }}>{pal.label}</span>
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
  const [paletteKey, setPaletteKey] = useState<PaletteKey>("soft-neutrals")
  const p = PALETTES[paletteKey]

  return (
    <div style={{ backgroundColor: p.background, color: p.headingText, fontFamily: "Georgia, serif", overflowX: "hidden", transition: "background-color 0.4s, color 0.4s" }}>
      <style>{`
        .blog-featured { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: center; }
        .blog-posts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem 2.5rem; }
        .blog-topics { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; }
        @media (max-width: 768px) {
          .blog-featured { grid-template-columns: 1fr; gap: 2rem; }
          .blog-posts-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        }
      `}</style>

      {/* ─── NAV ─── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: p.navBg, backdropFilter: "blur(8px)", borderBottom: `1px solid ${p.navBorder}`, transition: "all 0.4s" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 2rem", height: "4rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "1.15rem", fontWeight: 400, letterSpacing: "0.02em", color: p.headingText }}>Marginalia</span>
          <nav style={{ display: "flex", gap: "2rem", fontSize: "0.8rem", color: p.muted, fontFamily: "system-ui, sans-serif", alignItems: "center" }}>
            <a href="#writing" style={{ color: "inherit", textDecoration: "none" }}>Writing</a>
            <a href="#topics" style={{ color: "inherit", textDecoration: "none" }}>Topics</a>
            <a href="#newsletter" style={{ color: "inherit", textDecoration: "none" }}>Newsletter</a>
            <PaletteSwitcher current={paletteKey} onChange={setPaletteKey} />
          </nav>
          <a href="#newsletter" style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.55rem 1.2rem", border: `1px solid ${p.subBtnBorder}`, color: p.subBtnText, textDecoration: "none", fontFamily: "system-ui, sans-serif" }}>Subscribe</a>
        </div>
      </header>

      {/* ─── MASTHEAD ─── */}
      <section style={{ borderBottom: `1px solid ${p.navBorder}`, padding: "5rem 2rem 4rem", transition: "all 0.4s" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.lightMuted, marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif" }}>A journal on work, writing, and living deliberately</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "2rem", color: p.headingText }}>Marginalia</h1>
          <p style={{ fontSize: "1.05rem", color: p.muted, lineHeight: 1.7, maxWidth: "36rem", margin: "0 auto 2.5rem", fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
            By Jordan Wells — writer, reader, and occasional overthinker. Essays on slowness, creativity, and the life between the lines.
          </p>
          <a href="#newsletter" style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.85rem 2rem", backgroundColor: p.heroBtnBg, color: p.heroBtnText, textDecoration: "none", fontFamily: "system-ui, sans-serif", transition: "background-color 0.2s" }}>Get the newsletter</a>
        </div>
      </section>

      {/* ─── FEATURED ─── */}
      <section style={{ maxWidth: "56rem", margin: "0 auto", padding: "4rem 2rem" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase", color: p.lightMuted, marginBottom: "2rem", fontFamily: "system-ui, sans-serif" }}>Featured</p>
        <div className="blog-featured">
          <div style={{ overflow: "hidden", aspectRatio: "4/3" }}>
            <img src={FEATURED.img} alt={FEATURED.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: p.lightMuted, fontFamily: "system-ui, sans-serif", display: "block", marginBottom: "1rem" }}>{FEATURED.category}</span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 400, lineHeight: 1.2, marginBottom: "1.25rem", letterSpacing: "-0.01em", color: p.headingText }}>{FEATURED.title}</h2>
            <p style={{ fontSize: "0.9rem", color: p.muted, lineHeight: 1.7, marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>{FEATURED.excerpt}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.78rem", color: p.lightMuted, fontFamily: "system-ui, sans-serif", marginBottom: "1.5rem" }}>
              <span>{FEATURED.date}</span><span>·</span><span>{FEATURED.readTime}</span>
            </div>
            <a href="#" style={{ fontSize: "0.8rem", color: p.headingText, textDecoration: "underline", textUnderlineOffset: "4px", fontFamily: "system-ui, sans-serif" }}>Read essay →</a>
          </div>
        </div>
      </section>

      {/* ─── TOPICS ─── */}
      <section id="topics" style={{ borderTop: `1px solid ${p.navBorder}`, borderBottom: `1px solid ${p.navBorder}`, padding: "1.25rem 2rem", backgroundColor: p.topicsBg, transition: "all 0.4s" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <div className="blog-topics">
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: p.lightMuted, fontFamily: "system-ui, sans-serif", marginRight: "0.5rem" }}>Topics:</span>
            {TOPICS.map(topic => (
              <button key={topic} style={{ fontSize: "0.78rem", padding: "0.35rem 0.9rem", border: `1px solid ${p.topicBorder}`, backgroundColor: "transparent", color: p.muted, cursor: "pointer", fontFamily: "system-ui, sans-serif", transition: "all 0.2s" }}>{topic}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POSTS ─── */}
      <section id="writing" style={{ maxWidth: "56rem", margin: "0 auto", padding: "4rem 2rem" }}>
        <div className="blog-posts-grid">
          {POSTS.map(({ title, category, date, readTime, img }) => (
            <article key={title} style={{ cursor: "pointer" }}>
              <div style={{ overflow: "hidden", aspectRatio: "16/9", marginBottom: "1.25rem" }}>
                <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: p.lightMuted, fontFamily: "system-ui, sans-serif", display: "block", marginBottom: "0.5rem" }}>{category}</span>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 400, lineHeight: 1.3, marginBottom: "0.75rem", letterSpacing: "-0.01em", color: p.headingText }}>{title}</h3>
              <div style={{ fontSize: "0.78rem", color: p.lightMuted, fontFamily: "system-ui, sans-serif", display: "flex", gap: "0.75rem" }}>
                <span>{date}</span><span>·</span><span>{readTime}</span>
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "4rem", paddingTop: "3rem", borderTop: `1px solid ${p.navBorder}` }}>
          <a href="#" style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.85rem 2rem", border: `1px solid ${p.loadBorder}`, color: p.loadText, textDecoration: "none", fontFamily: "system-ui, sans-serif" }}>Load more</a>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section id="newsletter" style={{ backgroundColor: p.nlBg, padding: "6rem 2rem", transition: "background-color 0.4s" }}>
        <div style={{ maxWidth: "36rem", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.nlMuted, marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif" }}>The Newsletter</p>
          <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 400, color: p.nlText, marginBottom: "1.25rem" }}>Slow down your inbox.</h2>
          <p style={{ fontSize: "0.95rem", color: p.nlMuted, lineHeight: 1.7, marginBottom: "2.5rem", fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
            One essay, twice a month. No noise, no sponsors, no algorithm.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <input type="email" placeholder="your@email.com" style={{ flex: 1, minWidth: "200px", padding: "0.85rem 1rem", backgroundColor: "transparent", border: `1px solid ${p.nlInputBorder}`, color: p.nlText, fontSize: "0.875rem", fontFamily: "system-ui, sans-serif", outline: "none", boxSizing: "border-box" }} />
            <button style={{ backgroundColor: p.nlBtnBg, color: p.nlBtnText, padding: "0.85rem 1.5rem", border: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em", fontFamily: "system-ui, sans-serif", cursor: "pointer", textTransform: "uppercase", transition: "background-color 0.2s" }}>Subscribe</button>
          </div>
          <p style={{ fontSize: "0.75rem", color: p.nlSubMuted, marginTop: "1rem", fontFamily: "system-ui, sans-serif" }}>No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: `1px solid ${p.footerBorder}`, padding: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", fontSize: "0.78rem", color: p.lightMuted, fontFamily: "system-ui, sans-serif", transition: "all 0.4s" }}>
        <span style={{ fontFamily: "Georgia, serif", color: p.headingText }}>Marginalia</span>
        <div style={{ display: "flex", gap: "2rem" }}>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Archive</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>About</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>RSS</a>
        </div>
        <span>© 2025 Jordan Wells</span>
      </footer>
    </div>
  )
}