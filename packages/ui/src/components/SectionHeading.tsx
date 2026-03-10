import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react"

// ─── Utilities ────────────────────────────────────────────────────────────────

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

// ─── Types ────────────────────────────────────────────────────────────────────

type HeadingAlign = "left" | "center" | "right"
type HeadingSize = "sm" | "md" | "lg" | "xl"
type HeadingTheme = "light" | "dark"
type HeadingSpacing = "none" | "sm" | "md" | "lg"
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export interface SectionHeadingProps extends ComponentPropsWithoutRef<"div"> {
  eyebrow?: string
  headline: ReactNode
  description?: ReactNode
  cta?: ReactNode
  align?: HeadingAlign
  size?: HeadingSize
  theme?: HeadingTheme
  spacing?: HeadingSpacing
  as?: HeadingTag
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const alignClasses: Record<HeadingAlign, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
}

const headlineSizes: Record<HeadingSize, string> = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl",
  xl: "text-5xl md:text-6xl",
}

const spacingClasses: Record<HeadingSpacing, string> = {
  none: "",
  sm: "mb-8",
  md: "mb-12",
  lg: "mb-16",
}

// ─── Component ────────────────────────────────────────────────────────────────

export const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  function SectionHeading(
    {
      eyebrow,
      headline,
      description,
      cta,
      align = "center",
      size = "md",
      theme = "light",
      spacing = "md",
      as: HeadingTag = "h2",
      className,
      ...props
    },
    ref
  ) {
    const isDark = theme === "dark"

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-4",
          alignClasses[align],
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {eyebrow && (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest",
                isDark
                  ? "border-zinc-700 bg-zinc-800/50 text-zinc-400"
                  : "border-zinc-200 bg-zinc-50 text-zinc-500"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full",
                  isDark ? "bg-zinc-500" : "bg-zinc-400"
                )}
              />
              {eyebrow}
            </span>
          </div>
        )}

        <HeadingTag
          className={cn(
            "font-bold leading-[1.1] tracking-tight",
            headlineSizes[size],
            isDark ? "text-white" : "text-zinc-900",
            align === "center" && "max-w-3xl"
          )}
        >
          {headline}
        </HeadingTag>

        {description && (
          <p
            className={cn(
              "text-base leading-relaxed md:text-lg",
              align === "center" && "max-w-2xl",
              align === "left" && "max-w-xl",
              isDark ? "text-zinc-400" : "text-zinc-500"
            )}
          >
            {description}
          </p>
        )}

        {cta && (
          <div className={cn("mt-2", align === "center" && "flex justify-center", align === "right" && "flex justify-end")}>
            {cta}
          </div>
        )}
      </div>
    )
  }
)