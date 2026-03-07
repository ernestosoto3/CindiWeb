import type { ReactNode } from "react"

export interface HeroSectionProps {
  headline: string
  subheadline?: string
  cta?: ReactNode
  image?: ReactNode
}

export function HeroSection({ headline, subheadline, cta, image }: HeroSectionProps) {
  return (
    <section className="flex flex-col items-center gap-12 px-6 py-20 md:flex-row">
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          {headline}
        </h1>

        {subheadline ? <p className="max-w-xl text-lg text-gray-600">{subheadline}</p> : null}

        {cta ? <div>{cta}</div> : null}
      </div>

      {image ? <div className="flex-1">{image}</div> : null}
    </section>
  )
}