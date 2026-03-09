"use client"

import { Button } from "./Button"

export type PricingTier = {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
}

type Props = {
  tiers: PricingTier[]
  onSelect?: (tier: PricingTier) => void
}

export function PricingTable({ tiers, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`flex flex-col gap-6 rounded-2xl border p-8 ${
            tier.highlighted
              ? "border-indigo-500 bg-indigo-50 shadow-xl"
              : "border-gray-200 bg-white"
          }`}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              {tier.name}
            </p>

            <p className="mt-2 text-4xl font-bold text-gray-900">
              {tier.price}
              {tier.period ? (
                <span className="ml-1 text-base font-normal text-gray-500">
                  /{tier.period}
                </span>
              ) : null}
            </p>

            <p className="mt-2 text-sm text-gray-500">{tier.description}</p>
          </div>

          <ul className="flex flex-1 flex-col gap-3">
            {tier.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <span className="text-indigo-500">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            variant={tier.highlighted ? "primary" : "secondary"}
            onClick={() => onSelect?.(tier)}
            className="w-full"
          >
            {tier.cta}
          </Button>
        </div>
      ))}
    </div>
  )
}