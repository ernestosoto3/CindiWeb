import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react"

// ─── Utilities ────────────────────────────────────────────────────────────────

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

// ─── Types ────────────────────────────────────────────────────────────────────

type FeatureCardVariant = "default" | "outlined" | "filled" | "minimal"
type IconSize = "sm" | "md" | "lg"
type FeatureCardLayout = "vertical" | "horizontal"

export interface FeatureCardProps extends ComponentPropsWithoutRef<"div"> {
  icon?: ReactNode
  title: string
  description?: ReactNode
  metric?: string
  metricLabel?: string
  action?: ReactNode
  variant?: FeatureCardVariant
  iconSize?: IconSize
  layout?: FeatureCardLayout
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const variantClasses: Record<FeatureCardVariant, string> = {
  default:
    "rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:border-zinc-300 hover:shadow-md",
  outlined:
    "rounded-2xl border border-zinc-200 bg-transparent transition-all duration-200 hover:border-zinc-400 hover:bg-zinc-50/50",
  filled:
    "rounded-2xl border border-zinc-900 bg-zinc-900 text-white transition-all duration-200",
  minimal:
    "rounded-none border-none bg-transparent transition-all duration-200",
}

const iconContainerVariant: Record<FeatureCardVariant, string> = {
  default: "bg-zinc-100 text-zinc-700",
  outlined: "bg-zinc-100 text-zinc-700",
  filled: "bg-zinc-800 text-zinc-300",
  minimal: "bg-zinc-100 text-zinc-700",
}

const titleVariant: Record<FeatureCardVariant, string> = {
  default: "text-zinc-900",
  outlined: "text-zinc-900",
  filled: "text-white",
  minimal: "text-zinc-900",
}

const descVariant: Record<FeatureCardVariant, string> = {
  default: "text-zinc-500",
  outlined: "text-zinc-500",
  filled: "text-zinc-400",
  minimal: "text-zinc-500",
}

const metricVariant: Record<FeatureCardVariant, string> = {
  default: "text-zinc-900",
  outlined: "text-zinc-900",
  filled: "text-white",
  minimal: "text-zinc-900",
}

const iconSizeClasses: Record<IconSize, { container: string; icon: string }> = {
  sm: { container: "h-9 w-9 rounded-xl", icon: "h-4 w-4" },
  md: { container: "h-11 w-11 rounded-xl", icon: "h-5 w-5" },
  lg: { container: "h-14 w-14 rounded-2xl", icon: "h-7 w-7" },
}

// ─── Component ────────────────────────────────────────────────────────────────

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  function FeatureCard(
    {
      icon,
      title,
      description,
      metric,
      metricLabel,
      action,
      variant = "default",
      iconSize = "md",
      layout = "vertical",
      className,
      ...props
    },
    ref
  ) {
    const isMinimal = variant === "minimal"
    const pad = isMinimal ? "py-2" : "p-6"
    const isHorizontal = layout === "horizontal"

    return (
      <div
        ref={ref}
        className={cn(
          isHorizontal ? "flex items-start gap-4" : "flex flex-col",
          variantClasses[variant],
          pad,
          className
        )}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              "flex shrink-0 items-center justify-center transition-colors duration-200",
              !isHorizontal && "mb-4 self-start",
              iconContainerVariant[variant],
              iconSizeClasses[iconSize].container
            )}
          >
            <span
              className={cn(
                "flex items-center justify-center",
                iconSizeClasses[iconSize].icon
              )}
            >
              {icon}
            </span>
          </div>
        )}

        <div className={cn("min-w-0", isHorizontal ? "flex-1" : "flex flex-1 flex-col")}>
          {!isHorizontal && metric && (
            <div className="mb-3">
              <span
                className={cn(
                  "text-4xl font-bold leading-none tracking-tight",
                  metricVariant[variant]
                )}
              >
                {metric}
              </span>

              {metricLabel && (
                <p
                  className={cn(
                    "mt-1 text-xs font-medium uppercase tracking-wide",
                    descVariant[variant]
                  )}
                >
                  {metricLabel}
                </p>
              )}
            </div>
          )}

          <h3
            className={cn(
              "text-base font-semibold leading-snug",
              isHorizontal ? "mb-1" : (!metric && !icon ? "" : "mb-2"),
              titleVariant[variant]
            )}
          >
            {title}
          </h3>

          {description && (
            <p
              className={cn(
                "text-sm leading-relaxed",
                isHorizontal ? "" : "mt-1.5 flex-1",
                descVariant[variant]
              )}
            >
              {description}
            </p>
          )}

          {action && (
            <div className={cn(isHorizontal ? "mt-3" : "mt-4")}>
              {action}
            </div>
          )}
        </div>
      </div>
    )
  }
)