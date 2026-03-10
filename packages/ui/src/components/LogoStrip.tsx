"use client"

import { forwardRef, type ComponentPropsWithoutRef } from "react"

// ─── Utilities ────────────────────────────────────────────────────────────────

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Logo {
  name: string
  src: string
  width?: number
}

type LogoStripVariant = "light" | "dark" | "transparent"
type LogoStripMode = "static" | "marquee"

export interface LogoStripProps extends ComponentPropsWithoutRef<"div"> {
  logos: Logo[]
  label?: string
  mode?: LogoStripMode
  muted?: boolean
  variant?: LogoStripVariant
  speed?: number
  pauseOnHover?: boolean
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const wrapperStyles: Record<LogoStripVariant, string> = {
  light: "bg-white",
  dark: "bg-zinc-950",
  transparent: "bg-transparent",
}

const labelStyles: Record<LogoStripVariant, string> = {
  light: "text-zinc-400",
  dark: "text-zinc-600",
  transparent: "text-zinc-400",
}

// ─── Shared Logo Item ────────────────────────────────────────────────────────

function LogoImage({
  logo,
  muted,
  interactive = false,
}: {
  logo: Logo
  muted: boolean
  interactive?: boolean
}) {
  return (
    <img
      src={logo.src}
      alt={logo.name}
      width={logo.width}
      height={32}
      className={cn(
        "h-8 w-auto object-contain",
        interactive && "transition-all duration-300",
        muted
          ? interactive
            ? "grayscale opacity-40 hover:grayscale-0 hover:opacity-100"
            : "grayscale opacity-40"
          : interactive
            ? "opacity-80 hover:opacity-100"
            : "opacity-70"
      )}
    />
  )
}

// ─── Static grid ──────────────────────────────────────────────────────────────

function StaticGrid({
  logos,
  muted,
}: {
  logos: Logo[]
  muted: boolean
}) {
  return (
    <ul
      className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
      role="list"
    >
      {logos.map((logo) => (
        <li key={logo.name} className="flex items-center justify-center">
          <LogoImage logo={logo} muted={muted} interactive />
        </li>
      ))}
    </ul>
  )
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

function Marquee({
  logos,
  muted,
  speed,
  variant,
  pauseOnHover,
}: {
  logos: Logo[]
  muted: boolean
  speed: number
  variant: LogoStripVariant
  pauseOnHover: boolean
}) {
  const fadeColor: Record<LogoStripVariant, string> = {
    light: "from-white",
    dark: "from-zinc-950",
    transparent: "from-transparent",
  }

  const duplicated = [...logos, ...logos]

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={cn(
          "pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r to-transparent",
          fadeColor[variant]
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-l to-transparent",
          fadeColor[variant]
        )}
      />

      <div
        className={cn(
          "flex w-max",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `logo-strip-marquee ${speed}s linear infinite`,
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        {duplicated.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex shrink-0 items-center justify-center px-8"
          >
            <LogoImage logo={logo} muted={muted} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export const LogoStrip = forwardRef<HTMLDivElement, LogoStripProps>(
  function LogoStrip(
    {
      logos,
      label,
      mode = "static",
      muted = true,
      variant = "light",
      speed = 30,
      pauseOnHover = false,
      className,
      ...props
    },
    ref
  ) {
    if (!logos.length) return null

    const useMarquee = mode === "marquee" && logos.length > 1

    return (
      <div
        ref={ref}
        className={cn("w-full py-10", wrapperStyles[variant], className)}
        {...props}
      >
        {label && (
          <p
            className={cn(
              "mb-7 text-center text-xs font-semibold uppercase tracking-widest",
              labelStyles[variant]
            )}
          >
            {label}
          </p>
        )}

        {useMarquee ? (
          <Marquee
            logos={logos}
            muted={muted}
            speed={speed}
            variant={variant}
            pauseOnHover={pauseOnHover}
          />
        ) : (
          <StaticGrid logos={logos} muted={muted} />
        )}

        <style>{`
          @keyframes logo-strip-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    )
  }
)

LogoStrip.displayName = "LogoStrip"