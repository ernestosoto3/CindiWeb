"use client"

import { Button } from "./Button"

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
      className={cn("mt-0.5 h-4 w-4 shrink-0", featured ? "text-white" : "text-zinc-900")}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-zinc-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function FeatureRow({
  feature,
  featured,
}: {
  feature: PricingFeature | string
  featured: boolean
}) {
  const text = typeof feature === "string" ? feature : feature.text
  const included = typeof feature === "string" ? true : (feature.included ?? true)

  return (
    <li className="flex items-start gap-2.5">
      {included ? <CheckIcon featured={featured} /> : <XIcon />}
      <span
        className={cn(
          "text-sm leading-snug",
          included
            ? featured
              ? "text-zinc-100"
              : "text-zinc-600"
            : "text-zinc-400 line-through"
        )}
      >
        {text}
      </span>
    </li>
  )
}

function TierCard({
  tier,
  compact,
  onSelect,
}: {
  tier: PricingTier
  compact: boolean
  onSelect?: (tier: PricingTier) => void
}) {
  const featured = Boolean(tier.highlighted)

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border transition-shadow duration-200",
        compact ? "p-6" : "p-8",
        featured
          ? "border-zinc-900 bg-zinc-900 shadow-2xl shadow-zinc-900/20"
          : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md"
      )}
    >
      {featured && tier.badge ? (
        <div className="absolute left-1/2 top-[-0.875rem] -translate-x-1/2">
          <span className="inline-flex items-center whitespace-nowrap rounded-full border border-zinc-100 bg-white px-3 py-1 text-xs font-semibold text-zinc-900 shadow-md">
            {tier.badge}
          </span>
        </div>
      ) : null}

      <div className={cn("mb-6", compact && "mb-4")}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
          {tier.name}
        </p>

        <div className="flex items-baseline gap-1.5">
          <span
            className={cn(
              "font-bold tracking-tight",
              compact ? "text-3xl" : "text-4xl",
              featured ? "text-white" : "text-zinc-900"
            )}
          >
            {tier.price}
          </span>

          {tier.period ? <span className="text-sm text-zinc-400">/{tier.period}</span> : null}
        </div>

        {tier.description ? (
          <p
            className={cn(
              "mt-2 text-sm leading-relaxed",
              featured ? "text-zinc-400" : "text-zinc-500"
            )}
          >
            {tier.description}
          </p>
        ) : null}
      </div>

      <div
        className={cn(
          "mb-6 border-t",
          compact && "mb-4",
          featured ? "border-zinc-700" : "border-zinc-100"
        )}
      />

      <ul className="flex flex-1 flex-col gap-3">
        {tier.features.map((feature, index) => {
          const key =
            typeof feature === "string"
              ? `${tier.name}-${feature}-${index}`
              : `${tier.name}-${feature.text}-${index}`

          return <FeatureRow key={key} feature={feature} featured={featured} />
        })}
      </ul>

      {tier.cta ? (
        <div className={cn("mt-8", compact && "mt-6")}>
          <Button
            variant={featured ? "secondary" : "primary"}
            size={compact ? "md" : "lg"}
            fullWidth
            onClick={() => {
              tier.onCtaClick?.()
              onSelect?.(tier)
            }}
          >
            {tier.cta}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

const gridClasses: Record<number, string> = {
  1: "mx-auto max-w-sm grid-cols-1",
  2: "mx-auto max-w-3xl grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
}

export function PricingTable({
  tiers,
  heading,
  subheading,
  compact = false,
  onSelect,
  className,
}: PricingTableProps) {
  const cols = Math.min(tiers.length, 4)

  return (
    <section className={cn("w-full", className)}>
      {heading || subheading ? (
        <div className="mb-12 text-center">
          {heading ? (
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
              {heading}
            </h2>
          ) : null}

          {subheading ? (
            <p className="mx-auto mt-3 max-w-xl text-lg text-zinc-500">
              {subheading}
            </p>
          ) : null}
        </div>
      ) : null}

      <div
        className={cn(
          "grid items-start gap-5",
          gridClasses[cols] ?? "grid-cols-1 md:grid-cols-3"
        )}
      >
        {tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} compact={compact} onSelect={onSelect} />
        ))}
      </div>
    </section>
  )
}