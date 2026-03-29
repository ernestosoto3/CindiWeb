"use client"

import { useState } from "react"

/* ── 2 E-COMMERCE COLOR PALETTES ── */
const PALETTES = {
  "neutral-base": {
    label: "Neutral Base",
    swatch: "#452829",
    isDark: false,
    background: "#F3E8DF",
    surface: "#E8D1C5",
    primaryBrand: "#452829",
    secondaryBrand: "#57595B",
    accent: "#E8D1C5",
    headingText: "#452829",
    bodyText: "#452829",
    mutedText: "#57595B",
    border: "#57595B",
    ctaButton: "#E8D1C5",
    ctaHover: "#452829",
    // Derived
    navBg: "rgba(243,232,223,0.95)",
    navBorder: "#d5c4b8",
    darkText: "#452829",
    muted: "#57595B",
    lightMuted: "#a09890",
    trustBg: "#e6d5c9",
    catBorder: "#d5c4b8",
    productBg: "#e0cfc3",
    // Dark section (Our Story)
    storyBg: "#452829",
    storyText: "#F3E8DF",
    storyMuted: "#a09890",
    // Newsletter
    nlBg: "#F3E8DF",
    nlBorder: "#d5c4b8",
    nlBtnBg: "#452829",
    nlBtnText: "#F3E8DF",
    // Footer
    footerBorder: "#d5c4b8",
    footerMuted: "#a09890",
    // CTA buttons
    shopBtnBg: "#452829",
    shopBtnText: "#F3E8DF",
    shopBtnHoverBg: "#5a3a3b",
    outlineBorder: "#57595B",
    outlineText: "#57595B",
  },
  "strong-cta": {
    label: "Strong CTA Color",
    swatch: "#FA5C5C",
    isDark: false,
    background: "#FBEF76",
    surface: "#FEC288",
    primaryBrand: "#FA5C5C",
    secondaryBrand: "#FD8A6B",
    accent: "#FEC288",
    headingText: "#FA5C5C",
    bodyText: "#FA5C5C",
    mutedText: "#FA5C5C",
    border: "#FA5C5C",
    ctaButton: "#FEC288",
    ctaHover: "#FA5C5C",
    navBg: "rgba(251,239,118,0.95)",
    navBorder: "#FEC288",
    darkText: "#5a1a1a",
    muted: "#FA5C5C",
    lightMuted: "#FD8A6B",
    trustBg: "#fde68a",
    catBorder: "#FD8A6B",
    productBg: "#fde68a",
    storyBg: "#5a1a1a",
    storyText: "#FBEF76",
    storyMuted: "#FD8A6B",
    nlBg: "#FBEF76",
    nlBorder: "#FEC288",
    nlBtnBg: "#FA5C5C",
    nlBtnText: "#FBEF76",
    footerBorder: "#FEC288",
    footerMuted: "#FD8A6B",
    shopBtnBg: "#FA5C5C",
    shopBtnText: "#FBEF76",
    shopBtnHoverBg: "#e04a4a",
    outlineBorder: "#FD8A6B",
    outlineText: "#FA5C5C",
  },
} as const

type PaletteKey = keyof typeof PALETTES

/* ── CONTENT DATA ── */
const PRODUCTS = [
  { name: "Ridge Ceramic Mug", category: "Kitchen", price: "$42", img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80" },
  { name: "Woven Throw Blanket", category: "Home", price: "$128", img: "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&q=80" },
  { name: "Linen Apron", category: "Kitchen", price: "$68", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" },
  { name: "Hand-thrown Vase", category: "Decor", price: "$95", img: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&q=80" },
  { name: "Oak Serving Board", category: "Kitchen", price: "$84", img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80" },
  { name: "Merino Wool Pillow", category: "Home", price: "$110", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80" },
]

const CATEGORIES = ["All", "Kitchen", "Home", "Decor"]

const TRUST = ["🌿 Sustainably sourced", "🔨 Handmade by artisans", "📦 Free shipping over $100", "↩ 30-day returns"]

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
          borderRadius: "100px", padding: "0.3rem 0.65rem 0.3rem 0.4rem",
          cursor: "pointer", fontSize: "0.6rem",
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: p.muted, fontFamily: "system-ui, sans-serif",
          transition: "all 0.2s",
        }}
      >
        <span style={{
          width: 12, height: 12, borderRadius: "50%",
          backgroundColor: p.primaryBrand,
          border: `2px solid ${p.background}`,
          boxShadow: `0 0 0 1px ${p.navBorder}`,
        }} />
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
          <path d="M2 4L5 7L8 4" stroke={p.muted} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 98 }} />
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", right: 0,
            backgroundColor: p.background,
            border: `1px solid ${p.navBorder}`,
            borderRadius: "8px", padding: "0.5rem",
            zIndex: 99, minWidth: "175px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}>
            {(Object.entries(PALETTES) as [PaletteKey, typeof PALETTES[PaletteKey]][]).map(([key, pal]) => (
              <button
                key={key}
                onClick={() => { onChange(key); setOpen(false) }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  width: "100%", padding: "0.45rem 0.55rem",
                  background: key === current ? p.surface : "transparent",
                  border: "none", borderRadius: "5px",
                  cursor: "pointer", textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => { if (key !== current) e.currentTarget.style.background = p.surface }}
                onMouseLeave={e => { if (key !== current) e.currentTarget.style.background = "transparent" }}
              >
                <div style={{ display: "flex", gap: "2px" }}>
                  {[pal.primaryBrand, pal.secondaryBrand, pal.background].map((c, i) => (
                    <span key={i} style={{
                      width: 11, height: 11, borderRadius: "50%",
                      backgroundColor: c,
                      border: "1.5px solid rgba(0,0,0,0.08)",
                    }} />
                  ))}
                </div>
                <span style={{
                  fontSize: "0.65rem", color: p.darkText,
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: key === current ? 600 : 400,
                }}>{pal.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ── PRODUCT CARD ── */
function ProductCard({ name, category, price, img, palette }: {
  name: string; category: string; price: string; img: string;
  palette: typeof PALETTES[PaletteKey]
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ aspectRatio: "1", overflow: "hidden", backgroundColor: palette.productBg, marginBottom: "1rem" }}>
        <img src={img} alt={name} style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.5s",
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", fontFamily: "system-ui, sans-serif" }}>
        <div>
          <p style={{ fontSize: "0.875rem", fontWeight: 500, color: palette.darkText }}>{name}</p>
          <p style={{ fontSize: "0.75rem", color: palette.lightMuted, marginTop: "0.15rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{category}</p>
        </div>
        <p style={{ fontSize: "0.875rem", fontWeight: 500, color: palette.darkText }}>{price}</p>
      </div>
    </div>
  )
}

/* ── MAIN PAGE ── */
export default function Page() {
  const [paletteKey, setPaletteKey] = useState<PaletteKey>("neutral-base")
  const p = PALETTES[paletteKey]

  return (
    <div style={{
      backgroundColor: p.background, color: p.darkText,
      fontFamily: "Georgia, serif", overflowX: "hidden",
      transition: "background-color 0.4s, color 0.4s",
    }}>
      <style>{`
        .ec-hero { display: grid; grid-template-columns: 1fr 1fr; }
        .ec-products { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .ec-story { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        @media (max-width: 768px) {
          .ec-hero { grid-template-columns: 1fr; }
          .ec-hero-img { aspect-ratio: 4/3; }
          .ec-products { grid-template-columns: repeat(2, 1fr); }
          .ec-story { grid-template-columns: 1fr; }
          .ec-cats { display: none !important; }
        }
      `}</style>

      {/* ─── NAV ─── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: p.navBg, backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${p.navBorder}`,
        transition: "all 0.4s",
      }}>
        <div style={{
          maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem",
          height: "4rem", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontSize: "1.1rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 300, color: p.darkText }}>Maison</span>
          <nav style={{ display: "flex", alignItems: "center", gap: "2rem", fontSize: "0.875rem", color: p.muted, fontFamily: "system-ui, sans-serif" }}>
            <a href="#shop" style={{ color: "inherit", textDecoration: "none" }}>Shop</a>
            <a href="#story" style={{ color: "inherit", textDecoration: "none" }}>Our Story</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Journal</a>
            <PaletteSwitcher current={paletteKey} onChange={setPaletteKey} />
          </nav>
          <a href="#" style={{ fontSize: "0.875rem", color: p.darkText, textDecoration: "none", fontFamily: "system-ui, sans-serif" }}>Cart (0)</a>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="ec-hero">
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 2rem 5rem 4rem" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.lightMuted, marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif" }}>
            Handcrafted · Small Batch
          </p>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, lineHeight: 1.08, marginBottom: "2rem", color: p.headingText }}>
            Objects made<br />to last.
          </h1>
          <p style={{ color: p.muted, lineHeight: 1.6, maxWidth: "24rem", marginBottom: "2.5rem", fontFamily: "system-ui, sans-serif", fontSize: "0.95rem" }}>
            We work with small-scale makers across Europe to bring you pieces that age gracefully and live in your home for decades.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#shop" style={{
              fontSize: "0.875rem", backgroundColor: p.shopBtnBg, color: p.shopBtnText,
              padding: "0.9rem 2rem", textDecoration: "none", fontFamily: "system-ui, sans-serif",
              transition: "background-color 0.2s",
            }}>Shop Now</a>
            <a href="#story" style={{
              fontSize: "0.875rem", color: p.outlineText,
              padding: "0.9rem 2rem", border: `1px solid ${p.outlineBorder}`,
              textDecoration: "none", fontFamily: "system-ui, sans-serif",
            }}>Our Story</a>
          </div>
        </div>
        <div className="ec-hero-img" style={{ position: "relative", minHeight: "35rem" }}>
          <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80" alt="Artisan home goods" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <section style={{
        borderTop: `1px solid ${p.navBorder}`, borderBottom: `1px solid ${p.navBorder}`,
        backgroundColor: p.trustBg, padding: "1.5rem 0",
        transition: "all 0.4s",
      }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem", fontFamily: "system-ui, sans-serif" }}>
          {TRUST.map(item => (
            <span key={item} style={{ fontSize: "0.875rem", color: p.muted }}>{item}</span>
          ))}
        </div>
      </section>

      {/* ─── PRODUCT GRID ─── */}
      <section id="shop" style={{ maxWidth: "80rem", margin: "0 auto", padding: "6rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem" }}>
          <div>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.lightMuted, marginBottom: "0.5rem", fontFamily: "system-ui, sans-serif" }}>New Arrivals</p>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 300, color: p.headingText }}>Shop</h2>
          </div>
          <div className="ec-cats" style={{ display: "flex", gap: "0.75rem", fontFamily: "system-ui, sans-serif" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} style={{
                fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "0.5rem 1rem", border: `1px solid ${p.catBorder}`,
                color: p.muted, backgroundColor: "transparent",
                cursor: "pointer", fontFamily: "system-ui, sans-serif",
                transition: "all 0.2s",
              }}>{cat}</button>
            ))}
          </div>
        </div>

        <div className="ec-products">
          {PRODUCTS.map(product => (
            <ProductCard key={product.name} {...product} palette={p} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <a href="#" style={{
            fontSize: "0.875rem", border: `1px solid ${p.catBorder}`, color: p.muted,
            padding: "0.9rem 2.5rem", textDecoration: "none", fontFamily: "system-ui, sans-serif",
            transition: "all 0.2s",
          }}>View All Products</a>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section id="story" style={{
        backgroundColor: p.storyBg, color: p.storyText,
        padding: "7rem 1.5rem",
        transition: "all 0.4s",
      }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <div className="ec-story">
            <div>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", color: p.storyMuted, marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif" }}>Est. 2016</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.1, marginBottom: "2rem", color: p.storyText }}>
                We believe<br />in slow making.
              </h2>
              <p style={{ color: p.storyMuted, lineHeight: 1.6, marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif", fontSize: "0.95rem" }}>
                Maison started as a single potter's studio in Lisbon. Today we partner with 14 makers across Portugal, France, and Denmark — each chosen for their craft, not their output.
              </p>
              <p style={{ color: p.storyMuted, lineHeight: 1.6, fontFamily: "system-ui, sans-serif", fontSize: "0.95rem" }}>
                Every piece you buy comes with the maker's name and story. We think that matters.
              </p>
            </div>
            <div style={{ aspectRatio: "4/5", overflow: "hidden" }}>
              <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=700&q=80" alt="Potter at work" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section style={{ borderTop: `1px solid ${p.navBorder}`, padding: "5rem 1.5rem", textAlign: "center", backgroundColor: p.nlBg, transition: "all 0.4s" }}>
        <h3 style={{ fontSize: "1.75rem", fontWeight: 300, marginBottom: "0.75rem", color: p.headingText }}>Join our list.</h3>
        <p style={{ color: p.muted, fontSize: "0.875rem", marginBottom: "2rem", fontFamily: "system-ui, sans-serif" }}>
          New arrivals and maker stories, once a month.
        </p>
        <div style={{ display: "flex", maxWidth: "28rem", margin: "0 auto", gap: "0.5rem", fontFamily: "system-ui, sans-serif" }}>
          <input type="email" placeholder="your@email.com" style={{
            flex: 1, padding: "0.85rem 1rem", fontSize: "0.875rem",
            border: `1px solid ${p.nlBorder}`, backgroundColor: "transparent",
            color: p.darkText, outline: "none", boxSizing: "border-box",
          }} />
          <button style={{
            padding: "0.85rem 1.5rem", fontSize: "0.8rem", fontWeight: 700,
            letterSpacing: "0.05em", textTransform: "uppercase",
            backgroundColor: p.nlBtnBg, color: p.nlBtnText,
            border: "none", cursor: "pointer",
            transition: "background-color 0.2s",
          }}>Subscribe</button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: `1px solid ${p.footerBorder}`, padding: "2.5rem 1.5rem", transition: "all 0.4s" }}>
        <div style={{
          maxWidth: "72rem", margin: "0 auto",
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between",
          gap: "1rem", fontSize: "0.875rem", color: p.footerMuted, fontFamily: "system-ui, sans-serif",
        }}>
          <span style={{ letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Georgia, serif", fontWeight: 300, color: p.darkText }}>Maison</span>
          <div style={{ display: "flex", gap: "2rem" }}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Shipping</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Returns</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
          </div>
          <span>© 2025 Maison</span>
        </div>
      </footer>
    </div>
  )
}