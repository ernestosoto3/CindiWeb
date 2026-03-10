import type { ReactNode } from "react"

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

type HeroLayout = "centered" | "split" | "left-aligned"
type HeroSize = "sm" | "md" | "lg" | "xl" | "full"
type HeroBackground = "white" | "zinc" | "dark" | "gradient"

export interface HeroSectionProps {
  eyebrow?: string
  headline: ReactNode
  subheadline?: ReactNode
  primaryCta?: ReactNode
  secondaryCta?: ReactNode
  trustSignals?: ReactNode
  media?: ReactNode
  layout?: HeroLayout
  size?: HeroSize
  background?: HeroBackground
  className?: string
}

const sizeStyles: Record<HeroSize, string> = {
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-28 md:py-36",
  xl: "py-36 md:py-48",
  full: "min-h-screen py-20",
}

const bgStyles: Record<HeroBackground, string> = {
  white: "bg-white",
  zinc: "bg-zinc-50",
  dark: "bg-zinc-950 text-white",
  gradient: "bg-gradient-to-br from-zinc-50 via-white to-zinc-100",
}

const headlineSizes: Record<HeroSize, string> = {
  sm: "text-3xl md:text-4xl",
  md: "text-4xl md:text-5xl",
  lg: "text-5xl md:text-6xl",
  xl: "text-6xl md:text-7xl",
  full: "text-5xl md:text-7xl",
}

function Eyebrow({
  text,
  dark,
  centered,
}: {
  text: string
  dark: boolean
  centered?: boolean
}) {
  return (
    <div className={cn("mb-5 flex items-center gap-2", centered && "justify-center")}>
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-1",
          "text-xs font-semibold uppercase tracking-widest",
          dark
            ? "border-zinc-700 bg-zinc-800/50 text-zinc-400"
            : "border-zinc-200 bg-zinc-50 text-zinc-500"
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            dark ? "bg-zinc-500" : "bg-zinc-400"
          )}
        />
        {text}
      </span>
    </div>
  )
}

function GridTexture({ dark }: { dark: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        dark
          ? "[background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"
          : "[background-image:linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]",
        "[background-size:48px_48px]"
      )}
    />
  )
}

function HeroText({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  trustSignals,
  dark,
  centered,
  headlineSize,
}: {
  eyebrow?: string
  headline: ReactNode
  subheadline?: ReactNode
  primaryCta?: ReactNode
  secondaryCta?: ReactNode
  trustSignals?: ReactNode
  dark: boolean
  centered: boolean
  headlineSize: string
}) {
  const hasCtas = Boolean(primaryCta || secondaryCta)

  return (
    <div className={cn(centered && "text-center")}>
      {eyebrow ? <Eyebrow text={eyebrow} dark={dark} centered={centered} /> : null}

      <h1
        className={cn(
          "font-bold leading-[1.08] tracking-tight",
          headlineSize,
          dark ? "text-white" : "text-zinc-900"
        )}
      >
        {headline}
      </h1>

      {subheadline ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            centered ? "mx-auto max-w-2xl" : "max-w-xl",
            dark ? "text-zinc-400" : "text-zinc-500"
          )}
        >
          {subheadline}
        </p>
      ) : null}

      {hasCtas ? (
        <div
          className={cn(
            "mt-8 flex flex-wrap items-center gap-3",
            centered && "justify-center"
          )}
        >
          {primaryCta}
          {secondaryCta}
        </div>
      ) : null}

      {trustSignals ? (
        <div
          className={cn(
            "mt-10 border-t pt-8",
            dark ? "border-zinc-800" : "border-zinc-100"
          )}
        >
          {trustSignals}
        </div>
      ) : null}
    </div>
  )
}

export function HeroSection({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  trustSignals,
  media,
  layout = "split",
  size = "lg",
  background = "white",
  className,
}: HeroSectionProps) {
  const isDark = background === "dark"
  const addGrid = background === "dark" || background === "gradient"

  const textProps = {
    eyebrow,
    headline,
    subheadline,
    primaryCta,
    secondaryCta,
    trustSignals,
    dark: isDark,
    headlineSize: headlineSizes[size],
  }

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        bgStyles[background],
        sizeStyles[size],
        className
      )}
    >
      {addGrid ? <GridTexture dark={isDark} /> : null}

      {layout === "centered" ? (
        <div className="relative mx-auto max-w-4xl px-6">
          <HeroText {...textProps} centered />
          {media ? <div className="mt-14 w-full">{media}</div> : null}
        </div>
      ) : layout === "split" ? (
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <HeroText {...textProps} centered={false} />
            {media ? (
              <div className="flex items-center justify-center lg:justify-end">
                {media}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="relative mx-auto max-w-7xl px-6">
          <HeroText {...textProps} centered={false} />
          {media ? <div className="mt-14">{media}</div> : null}
        </div>
      )}
    </section>
  )
}