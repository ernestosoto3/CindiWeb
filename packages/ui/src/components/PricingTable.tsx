"use client"

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

export interface PricingFeature {
  text: string
  included?: boolean
}

export interface PricingTier {
  name: string
  price: string
  /** Pass "mo" or "yr" — the slash is added automatically */
  period?: string
  description?: string
  features: (PricingFeature | string)[]
  cta?: string
  onCtaClick?: () => void
  highlighted?: boolean
  badge?: string
}

export interface PricingTableProps {
  tiers: PricingTier[]
  heading?: string
  subheading?: string
  compact?: boolean
  onSelect?: (tier: PricingTier) => void
  className?: string
}

function CheckIcon({ featured }: { featured: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke={featured ? "#ffffff" : "#4f46e5"}
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 2 }}
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 2 }}
      aria-hidden="true"
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function FeatureRow({ feature, featured }: { feature: PricingFeature | string; featured: boolean }) {
  const text = typeof feature === "string" ? feature : feature.text
  const included = typeof feature === "string" ? true : (feature.included ?? true)

  return (
    <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
      {included ? <CheckIcon featured={featured} /> : <XIcon />}
      <span style={{
        fontSize: 14,
        lineHeight: "1.4",
        color: !included ? "#9ca3af" : featured ? "#e4e4e7" : "#52525b",
        textDecoration: !included ? "line-through" : "none",
      }}>
        {text}
      </span>
    </li>
  )
}

function TierCard({
  tier, compact, onSelect,
}: {
  tier: PricingTier
  compact: boolean
  onSelect?: (tier: PricingTier) => void
}) {
  const featured = Boolean(tier.highlighted)
  const pad = compact ? 24 : 32
  const period = tier.period ? tier.period.replace(/^\//, "") : undefined

  // Button styles vary by featured state
  const btnBase: React.CSSProperties = {
    width: "100%",
    padding: "13px 24px",
    borderRadius: 10,
    border: "none",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.15s, background-color 0.15s",
  }

  const featuredBtn: React.CSSProperties = {
    ...btnBase,
    backgroundColor: "#ffffff",
    color: "#18181b",
  }

  const defaultBtn: React.CSSProperties = {
    ...btnBase,
    backgroundColor: "#18181b",
    color: "#ffffff",
  }

  return (
    <div style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      borderRadius: 16,
      padding: pad,
      border: featured ? "1px solid #18181b" : "1px solid #e4e4e7",
      backgroundColor: featured ? "#18181b" : "#ffffff",
      boxShadow: featured
        ? "0 20px 40px rgba(0,0,0,0.25)"
        : "0 1px 3px rgba(0,0,0,0.06)",
    }}>

      {/* Badge */}
      {featured && tier.badge ? (
        <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            borderRadius: 999,
            border: "1px solid #e4e4e7",
            background: "#ffffff",
            padding: "4px 12px",
            fontSize: 12,
            fontWeight: 600,
            color: "#18181b",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          }}>
            {tier.badge}
          </span>
        </div>
      ) : null}

      {/* Header */}
      <div style={{ marginBottom: compact ? 16 : 24 }}>
        <p style={{
          marginBottom: 12,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#71717a",
        }}>
          {tier.name}
        </p>

        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
            fontSize: compact ? 32 : 42,
            color: featured ? "#ffffff" : "#18181b",
          }}>
            {tier.price}
          </span>
          {period ? (
            <span style={{ fontSize: 14, color: featured ? "#71717a" : "#a1a1aa" }}>
              /{period}
            </span>
          ) : null}
        </div>

        {tier.description ? (
          <p style={{
            marginTop: 10,
            fontSize: 14,
            lineHeight: "1.5",
            color: featured ? "#a1a1aa" : "#71717a",
          }}>
            {tier.description}
          </p>
        ) : null}
      </div>

      {/* Divider */}
      <div style={{
        marginBottom: compact ? 16 : 24,
        borderTop: `1px solid ${featured ? "rgba(255,255,255,0.1)" : "#f4f4f5"}`,
      }} />

      {/* Features */}
      <ul style={{
        flex: 1,
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}>
        {tier.features.map((feature, index) => {
          const key = typeof feature === "string"
            ? `${tier.name}-${feature}-${index}`
            : `${tier.name}-${feature.text}-${index}`
          return <FeatureRow key={key} feature={feature} featured={featured} />
        })}
      </ul>

      {/* CTA — all inline styles, no shared Button component */}
      {tier.cta ? (
        <div style={{ marginTop: compact ? 24 : 32 }}>
          <button
            onClick={() => { tier.onCtaClick?.(); onSelect?.(tier) }}
            style={featured ? featuredBtn : defaultBtn}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            {tier.cta}
          </button>
        </div>
      ) : null}
    </div>
  )
}

export function PricingTable({
  tiers, heading, subheading, compact = false, onSelect, className,
}: PricingTableProps) {
  return (
    <section className={cn("w-full", className)}>
      {heading || subheading ? (
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          {heading ? (
            <h2 style={{ fontSize: 36, fontWeight: 700, color: "#18181b", letterSpacing: "-0.02em" }}>
              {heading}
            </h2>
          ) : null}
          {subheading ? (
            <p style={{ marginTop: 12, fontSize: 18, color: "#71717a", maxWidth: 480, margin: "12px auto 0" }}>
              {subheading}
            </p>
          ) : null}
        </div>
      ) : null}

      <div
        className="pricing-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(tiers.length, 3)}, minmax(0, 1fr))`,
          gap: 20,
          alignItems: "start",
        }}
      >
        {tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} compact={compact} onSelect={onSelect} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}