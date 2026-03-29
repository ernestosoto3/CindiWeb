"use client"

import { useState } from "react"

/* ── 5 RESTAURANT COLOR PALETTES ── */
const PALETTES = {
  "warm-earthy": {
    label: "Warm Earthy Tones",
    swatch: "#8A7650",
    isDark: false,
    background: "#ECE7D1",
    surface: "#DBCEA5",
    primaryBrand: "#8A7650",
    secondaryBrand: "#8E977D",
    accent: "#DBCEA5",
    headingText: "#8A7650",
    bodyText: "#8A7650",
    mutedText: "#8A7650",
    border: "#8E977D",
    ctaButton: "#DBCEA5",
    ctaHover: "#8A7650",
    navBg: "rgba(236,231,209,0.92)", navBorder: "rgba(142,151,125,0.15)",
    heroOverlay: "rgba(60,48,28,0.65)", heroGradient: "rgba(60,48,28,0.85)",
    text: "#ECE7D1", darkText: "#3c301c", muted: "#8E977D", dim: "#6b5d4e",
    goldAccent: "#8A7650", introStripBorder: "rgba(142,151,125,0.2)",
    menuSectionBorder: "rgba(142,151,125,0.15)", menuItemBorder: "rgba(142,151,125,0.1)",
    photoOpacity: 0.7, testimonialBorder: "rgba(142,151,125,0.12)",
    hoursBg: "#3c301c", hoursText: "#ECE7D1", hoursMuted: "#8E977D",
    hoursBorder: "rgba(236,231,209,0.1)", inputBg: "transparent", inputBorder: "rgba(236,231,209,0.15)",
    inputText: "#ECE7D1", formBtnBg: "#ECE7D1", formBtnText: "#3c301c",
    footerBorder: "rgba(142,151,125,0.15)", footerBg: "#ECE7D1", footerMuted: "#8E977D",
    reserveBtnBorder: "#8A7650", reserveBtnText: "#8A7650",
  },
  "deep-reds": {
    label: "Deep Reds / Wine",
    swatch: "#5E0006",
    isDark: false,
    background: "#EED9B9",
    surface: "#D53E0F",
    primaryBrand: "#5E0006",
    secondaryBrand: "#9B0F06",
    accent: "#5E0006",
    headingText: "#5E0006",
    bodyText: "#5E0006",
    mutedText: "#9B0F06",
    border: "#9B0F06",
    ctaButton: "#5E0006",
    ctaHover: "#9B0F06",
    navBg: "rgba(238,217,185,0.92)", navBorder: "rgba(155,15,6,0.12)",
    heroOverlay: "rgba(94,0,6,0.7)", heroGradient: "rgba(94,0,6,0.88)",
    text: "#EED9B9", darkText: "#3a0804", muted: "#9B0F06", dim: "#7a2015",
    goldAccent: "#5E0006", introStripBorder: "rgba(155,15,6,0.15)",
    menuSectionBorder: "rgba(155,15,6,0.12)", menuItemBorder: "rgba(155,15,6,0.08)",
    photoOpacity: 0.65, testimonialBorder: "rgba(155,15,6,0.1)",
    hoursBg: "#3a0804", hoursText: "#EED9B9", hoursMuted: "#9B0F06",
    hoursBorder: "rgba(238,217,185,0.1)", inputBg: "transparent", inputBorder: "rgba(238,217,185,0.15)",
    inputText: "#EED9B9", formBtnBg: "#EED9B9", formBtnText: "#3a0804",
    footerBorder: "rgba(155,15,6,0.12)", footerBg: "#EED9B9", footerMuted: "#9B0F06",
    reserveBtnBorder: "#5E0006", reserveBtnText: "#5E0006",
  },
  "olive-sage": {
    label: "Olive Sage",
    swatch: "#9AB17A",
    isDark: false,
    background: "#FBE8CE",
    surface: "#E4DFB5",
    primaryBrand: "#9AB17A",
    secondaryBrand: "#C3CC9B",
    accent: "#E4DFB5",
    headingText: "#9AB17A",
    bodyText: "#9AB17A",
    mutedText: "#9AB17A",
    border: "#9AB17A",
    ctaButton: "#E4DFB5",
    ctaHover: "#9AB17A",
    navBg: "rgba(251,232,206,0.92)", navBorder: "rgba(154,177,122,0.15)",
    heroOverlay: "rgba(42,50,30,0.65)", heroGradient: "rgba(42,50,30,0.85)",
    text: "#FBE8CE", darkText: "#2a321e", muted: "#9AB17A", dim: "#6b7a55",
    goldAccent: "#9AB17A", introStripBorder: "rgba(154,177,122,0.18)",
    menuSectionBorder: "rgba(154,177,122,0.12)", menuItemBorder: "rgba(154,177,122,0.08)",
    photoOpacity: 0.7, testimonialBorder: "rgba(154,177,122,0.1)",
    hoursBg: "#2a321e", hoursText: "#FBE8CE", hoursMuted: "#C3CC9B",
    hoursBorder: "rgba(251,232,206,0.1)", inputBg: "transparent", inputBorder: "rgba(251,232,206,0.15)",
    inputText: "#FBE8CE", formBtnBg: "#FBE8CE", formBtnText: "#2a321e",
    footerBorder: "rgba(154,177,122,0.12)", footerBg: "#FBE8CE", footerMuted: "#9AB17A",
    reserveBtnBorder: "#9AB17A", reserveBtnText: "#9AB17A",
  },
  "cream-beige": {
    label: "Cream / Beige",
    swatch: "#D9A299",
    isDark: false,
    background: "#FAF7F3",
    surface: "#F0E4D3",
    primaryBrand: "#D9A299",
    secondaryBrand: "#DCC5B2",
    accent: "#F0E4D3",
    headingText: "#D9A299",
    bodyText: "#D9A299",
    mutedText: "#D9A299",
    border: "#D9A299",
    ctaButton: "#F0E4D3",
    ctaHover: "#D9A299",
    navBg: "rgba(250,247,243,0.92)", navBorder: "rgba(217,162,153,0.15)",
    heroOverlay: "rgba(90,50,45,0.65)", heroGradient: "rgba(90,50,45,0.85)",
    text: "#FAF7F3", darkText: "#5a322d", muted: "#D9A299", dim: "#b08478",
    goldAccent: "#D9A299", introStripBorder: "rgba(217,162,153,0.18)",
    menuSectionBorder: "rgba(217,162,153,0.12)", menuItemBorder: "rgba(217,162,153,0.08)",
    photoOpacity: 0.7, testimonialBorder: "rgba(217,162,153,0.1)",
    hoursBg: "#5a322d", hoursText: "#FAF7F3", hoursMuted: "#DCC5B2",
    hoursBorder: "rgba(250,247,243,0.1)", inputBg: "transparent", inputBorder: "rgba(250,247,243,0.15)",
    inputText: "#FAF7F3", formBtnBg: "#FAF7F3", formBtnText: "#5a322d",
    footerBorder: "rgba(217,162,153,0.12)", footerBg: "#FAF7F3", footerMuted: "#D9A299",
    reserveBtnBorder: "#D9A299", reserveBtnText: "#D9A299",
  },
  "charcoal-espresso": {
    label: "Charcoal Espresso",
    swatch: "#D5CEA3",
    isDark: true,
    background: "#1A120B",
    surface: "#3C2A21",
    primaryBrand: "#D5CEA3",
    secondaryBrand: "#E5E5CB",
    accent: "#1A120B",
    headingText: "#E5E5CB",
    bodyText: "#D5CEA3",
    mutedText: "#D5CEA3",
    border: "#3C2A21",
    ctaButton: "#D5CEA3",
    ctaHover: "#E5E5CB",
    navBg: "rgba(26,18,11,0.92)", navBorder: "rgba(213,206,163,0.08)",
    heroOverlay: "rgba(26,18,11,0.6)", heroGradient: "rgba(26,18,11,0.88)",
    text: "#E5E5CB", darkText: "#E5E5CB", muted: "#D5CEA3", dim: "#8a7e5a",
    goldAccent: "#D5CEA3", introStripBorder: "rgba(213,206,163,0.1)",
    menuSectionBorder: "rgba(213,206,163,0.08)", menuItemBorder: "rgba(213,206,163,0.06)",
    photoOpacity: 0.6, testimonialBorder: "rgba(213,206,163,0.08)",
    hoursBg: "#0e0a06", hoursText: "#E5E5CB", hoursMuted: "#D5CEA3",
    hoursBorder: "rgba(213,206,163,0.08)", inputBg: "transparent", inputBorder: "rgba(213,206,163,0.15)",
    inputText: "#E5E5CB", formBtnBg: "#D5CEA3", formBtnText: "#1A120B",
    footerBorder: "rgba(213,206,163,0.08)", footerBg: "#1A120B", footerMuted: "#8a7e5a",
    reserveBtnBorder: "#D5CEA3", reserveBtnText: "#D5CEA3",
  },
} as const

type PaletteKey = keyof typeof PALETTES

/* ── DATA ── */
const MENU: Record<string, { name: string; desc: string; price: string }[]> = {
  Starters: [
    { name: "Burrata & Heirloom", desc: "Slow-roasted tomatoes, torn basil, aged balsamic", price: "$16" },
    { name: "Tuna Tartare", desc: "Soy-lime dressing, avocado mousse, sesame crisp", price: "$19" },
    { name: "Charred Leek Velouté", desc: "Crème fraîche, chive oil, smoked paprika", price: "$14" },
  ],
  Mains: [
    { name: "Braised Short Rib", desc: "Red wine jus, celery root purée, crispy shallots", price: "$38" },
    { name: "Pan-Seared Halibut", desc: "Lemon beurre blanc, capers, wilted spinach", price: "$34" },
    { name: "Wild Mushroom Risotto", desc: "Truffle oil, aged parmesan, chives (v)", price: "$28" },
    { name: "Duck Confit", desc: "Cherry gastrique, lentil ragù, micro greens", price: "$36" },
  ],
  Desserts: [
    { name: "Dark Chocolate Tart", desc: "Salted caramel, vanilla crème fraîche", price: "$12" },
    { name: "Lavender Panna Cotta", desc: "Honey tuile, seasonal berries", price: "$11" },
    { name: "Seasonal Sorbet", desc: "Ask your server for today's selection", price: "$9" },
  ],
}

const HOURS: [string, string][] = [
  ["Tuesday – Thursday", "5:00 pm – 10:00 pm"],
  ["Friday – Saturday", "4:30 pm – 11:00 pm"],
  ["Sunday", "4:00 pm – 9:00 pm"],
  ["Monday", "Closed"],
]

const TESTIMONIALS = [
  { quote: "The short rib alone is worth the trip. One of the best meals I've had in the city.", author: "Maria G.", via: "Google" },
  { quote: "Intimate, warm, and the service is impeccable. We go back every anniversary.", author: "James & Clara", via: "Yelp" },
  { quote: "I brought a client here and closed the deal. The room does the work for you.", author: "Daniel P.", via: "OpenTable" },
]

const PHOTOS = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
]

/* ── PALETTE SWITCHER ── */
function PaletteSwitcher({ current, onChange }: { current: PaletteKey; onChange: (k: PaletteKey) => void }) {
  const [open, setOpen] = useState(false)
  const p = PALETTES[current]
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} aria-label="Change color palette" style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: `1px solid ${p.navBorder}`, borderRadius: "100px", padding: "0.3rem 0.65rem 0.3rem 0.4rem", cursor: "pointer", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: p.muted, fontFamily: "system-ui, sans-serif", transition: "all 0.2s" }}>
        <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: p.primaryBrand, border: "2px solid rgba(255,255,255,0.1)" }} />
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}><path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && (<>
        <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 98 }} />
        <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, backgroundColor: p.isDark ? p.background : p.background, border: `1px solid ${p.navBorder}`, borderRadius: "8px", padding: "0.5rem", zIndex: 99, minWidth: "190px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
          {(Object.entries(PALETTES) as [PaletteKey, typeof PALETTES[PaletteKey]][]).map(([key, pal]) => (
            <button key={key} onClick={() => { onChange(key); setOpen(false) }} style={{ display: "flex", alignItems: "center", gap: "0.6rem", width: "100%", padding: "0.45rem 0.55rem", background: key === current ? "rgba(128,128,128,0.1)" : "transparent", border: "none", borderRadius: "5px", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
              onMouseEnter={e => { if (key !== current) e.currentTarget.style.background = "rgba(128,128,128,0.08)" }}
              onMouseLeave={e => { if (key !== current) e.currentTarget.style.background = "transparent" }}
            >
              <div style={{ display: "flex", gap: "2px" }}>
                {[pal.primaryBrand, pal.secondaryBrand, pal.background].map((c, i) => (
                  <span key={i} style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: c, border: "1.5px solid rgba(128,128,128,0.15)" }} />
                ))}
              </div>
              <span style={{ fontSize: "0.65rem", color: p.isDark ? p.text : p.darkText, fontFamily: "system-ui, sans-serif", fontWeight: key === current ? 600 : 400, opacity: key === current ? 1 : 0.7 }}>{pal.label}</span>
            </button>
          ))}
        </div>
      </>)}
    </div>
  )
}

/* ── RESERVATION FORM ── */
function ReserveForm({ palette }: { palette: typeof PALETTES[PaletteKey] }) {
  const [form, setForm] = useState({ name: "", email: "", guests: "", message: "" })
  const [sent, setSent] = useState(false)
  const p = palette
  const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: p.hoursMuted, fontFamily: "system-ui, sans-serif", marginBottom: "0.4rem" }
  const inputStyle: React.CSSProperties = { width: "100%", padding: "0.85rem 1rem", backgroundColor: p.inputBg, border: `1px solid ${p.inputBorder}`, color: p.inputText, fontSize: "0.875rem", fontFamily: "system-ui, sans-serif", outline: "none", boxSizing: "border-box" }

  if (sent) return (
    <div style={{ padding: "2rem", border: `1px solid ${p.hoursBorder}`, textAlign: "center" }}>
      <p style={{ fontSize: "1rem", color: p.goldAccent, fontWeight: 400 }}>Thank you</p>
      <p style={{ fontSize: "0.85rem", color: p.hoursMuted, marginTop: "0.5rem", fontFamily: "system-ui, sans-serif" }}>We'll confirm your reservation by email.</p>
    </div>
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <p style={{ fontSize: "0.72rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.goldAccent, marginBottom: "0.5rem", fontFamily: "system-ui, sans-serif" }}>Reserve a Table</p>
      {[
        { key: "name", label: "Name", placeholder: "Your name", type: "text" },
        { key: "email", label: "Email", placeholder: "you@example.com", type: "email" },
        { key: "guests", label: "Party Size", placeholder: "e.g. 2 guests", type: "text" },
      ].map(({ key, label, placeholder, type }) => (
        <div key={key}>
          <label style={labelStyle}>{label}</label>
          <input style={inputStyle} type={type} placeholder={placeholder} value={(form as Record<string,string>)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
        </div>
      ))}
      <div>
        <label style={labelStyle}>Special Requests</label>
        <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }} placeholder="Dietary needs, occasion…" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      </div>
      <button onClick={() => { if (form.name && form.email && form.guests) setSent(true) }} style={{
        width: "100%", padding: "0.9rem", backgroundColor: p.formBtnBg, color: p.formBtnText,
        border: "none", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em",
        textTransform: "uppercase", fontFamily: "system-ui, sans-serif", cursor: "pointer", transition: "opacity 0.2s",
      }}>Request Reservation</button>
    </div>
  )
}

/* ── MAIN PAGE ── */
export default function Page() {
  const [paletteKey, setPaletteKey] = useState<PaletteKey>("warm-earthy")
  const p = PALETTES[paletteKey]

  return (
    <div style={{ backgroundColor: p.background, color: p.isDark ? p.text : p.darkText, fontFamily: "Georgia, serif", overflowX: "hidden", transition: "background-color 0.4s, color 0.4s" }}>
      <style>{`
        .rest-intro { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; text-align: center; }
        .rest-photos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .rest-reviews { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; }
        .rest-hours { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; }
        @media (max-width: 768px) {
          .rest-intro { grid-template-columns: 1fr; gap: 1.5rem; }
          .rest-photos { grid-template-columns: 1fr; }
          .rest-reviews { grid-template-columns: 1fr; gap: 2rem; }
          .rest-hours { grid-template-columns: 1fr; gap: 3rem; }
        }
      `}</style>

      {/* ─── NAV ─── */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem", height: "4.5rem", backgroundColor: p.navBg, backdropFilter: "blur(8px)", borderBottom: `1px solid ${p.navBorder}`, transition: "all 0.4s" }}>
        <span style={{ fontSize: "1.15rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 300, color: p.goldAccent }}>Sotto Voce</span>
        <nav style={{ display: "flex", gap: "2rem", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", color: p.muted, fontFamily: "system-ui, sans-serif", alignItems: "center" }}>
          <a href="#menu" style={{ color: "inherit", textDecoration: "none" }}>Menu</a>
          <a href="#hours" style={{ color: "inherit", textDecoration: "none" }}>Hours</a>
          <a href="#reserve" style={{ color: "inherit", textDecoration: "none" }}>Reserve</a>
          <PaletteSwitcher current={paletteKey} onChange={setPaletteKey} />
        </nav>
        <a href="#reserve" style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "0.6rem 1.25rem", border: `1px solid ${p.reserveBtnBorder}`, color: p.reserveBtnText, textDecoration: "none", fontFamily: "system-ui, sans-serif" }}>Reserve</a>
      </header>

      {/* ─── HERO ─── */}
      <section style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&q=80" alt="Restaurant" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${p.heroGradient} 0%, ${p.heroOverlay} 50%, transparent 100%)` }} />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 1.5rem" }}>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.5em", textTransform: "uppercase", color: p.goldAccent, marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif" }}>Fine Dining · Downtown</p>
          <h1 style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 300, fontStyle: "italic", color: p.text, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "2rem" }}>Sotto Voce</h1>
          <p style={{ color: p.muted, fontSize: "1.1rem", fontWeight: 300, maxWidth: "22rem", margin: "0 auto 3rem", letterSpacing: "0.03em" }}>Modern European cuisine.<br />Open Tuesday through Sunday.</p>
          <a href="#reserve" style={{ display: "inline-block", fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", padding: "1rem 2.5rem", border: `1px solid ${p.goldAccent}`, color: p.goldAccent, textDecoration: "none", fontFamily: "system-ui, sans-serif", transition: "all 0.3s" }}>Reserve a Table</a>
        </div>
      </section>

      {/* ─── INTRO STRIP ─── */}
      <section style={{ borderTop: `1px solid ${p.introStripBorder}`, borderBottom: `1px solid ${p.introStripBorder}`, padding: "4rem 2rem", transition: "all 0.4s" }}>
        <div style={{ maxWidth: "52rem", margin: "0 auto" }}>
          <div className="rest-intro">
            {[{ label: "Experience", value: "12 Years" }, { label: "Seats", value: "48 Only" }, { label: "Michelin", value: "Recognized" }].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontSize: "1.75rem", fontWeight: 300, color: p.goldAccent, marginBottom: "0.25rem" }}>{value}</p>
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: p.dim, fontFamily: "system-ui, sans-serif" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MENU ─── */}
      <section id="menu" style={{ maxWidth: "48rem", margin: "0 auto", padding: "7rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.goldAccent, marginBottom: "1rem", fontFamily: "system-ui, sans-serif" }}>Seasonal</p>
          <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 300, fontStyle: "italic", color: p.headingText }}>Our Menu</h2>
        </div>
        {Object.entries(MENU).map(([section, items]) => (
          <div key={section} style={{ marginBottom: "4rem" }}>
            <h3 style={{ fontSize: "0.72rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.dim, marginBottom: "2rem", paddingBottom: "0.75rem", borderBottom: `1px solid ${p.menuSectionBorder}`, fontFamily: "system-ui, sans-serif" }}>{section}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {items.map(item => (
                <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1.5rem" }}>
                  <div>
                    <p style={{ fontSize: "1.1rem", fontWeight: 300, color: p.headingText }}>{item.name}</p>
                    <p style={{ fontSize: "0.875rem", color: p.dim, marginTop: "0.25rem", fontWeight: 300 }}>{item.desc}</p>
                  </div>
                  <p style={{ color: p.goldAccent, fontWeight: 300, whiteSpace: "nowrap", fontSize: "0.875rem", marginTop: "0.15rem" }}>{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ─── PHOTOS ─── */}
      <section className="rest-photos">
        {PHOTOS.map((src, i) => (
          <div key={i} style={{ aspectRatio: "1", overflow: "hidden" }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: p.photoOpacity, transition: "opacity 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
              onMouseLeave={e => e.currentTarget.style.opacity = String(p.photoOpacity)}
            />
          </div>
        ))}
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: "7rem 2rem", borderTop: `1px solid ${p.testimonialBorder}`, transition: "all 0.4s" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.goldAccent, textAlign: "center", marginBottom: "4rem", fontFamily: "system-ui, sans-serif" }}>What Guests Say</p>
          <div className="rest-reviews">
            {TESTIMONIALS.map(({ quote, author, via }) => (
              <div key={author} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <p style={{ color: p.muted, fontWeight: 300, lineHeight: 1.6, fontStyle: "italic", fontSize: "0.9rem" }}>"{quote}"</p>
                <div>
                  <p style={{ fontSize: "0.875rem", color: p.headingText }}>{author}</p>
                  <p style={{ fontSize: "0.72rem", color: p.dim, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.15rem", fontFamily: "system-ui, sans-serif" }}>{via}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOURS + RESERVE ─── */}
      <section id="hours" style={{ backgroundColor: p.hoursBg, borderTop: `1px solid ${p.hoursBorder}`, transition: "background-color 0.4s" }}>
        <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "7rem 2rem" }}>
          <div className="rest-hours">
            <div>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.goldAccent, marginBottom: "2rem", fontFamily: "system-ui, sans-serif" }}>Hours</p>
              {HOURS.map(([day, time]) => (
                <div key={day} style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0", borderBottom: `1px solid ${p.hoursBorder}`, fontSize: "0.875rem" }}>
                  <span style={{ color: p.hoursMuted, fontWeight: 300 }}>{day}</span>
                  <span style={{ color: p.hoursText, fontWeight: 300 }}>{time}</span>
                </div>
              ))}
              <div style={{ marginTop: "2.5rem", fontSize: "0.78rem", color: p.hoursMuted, lineHeight: 2, fontFamily: "system-ui, sans-serif" }}>
                <p>123 Main Street, Downtown</p>
                <p>reservations@sottovoce.com</p>
                <p>(555) 012-3456</p>
              </div>
            </div>
            <div id="reserve">
              <ReserveForm palette={p} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: `1px solid ${p.footerBorder}`, backgroundColor: p.footerBg, padding: "2.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: p.footerMuted, fontFamily: "system-ui, sans-serif", transition: "all 0.4s" }}>
        <span style={{ color: p.goldAccent }}>Sotto Voce</span>
        <span>© 2025</span>
      </footer>
    </div>
  )
}