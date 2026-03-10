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

type TestimonialVariant = "default" | "outlined" | "filled" | "minimal"

export interface TestimonialCardProps
  extends ComponentPropsWithoutRef<"figure"> {
  quote: ReactNode
  authorName: string
  authorRole?: string
  company?: string
  avatarSrc?: string
  avatarAlt?: string
  rating?: 1 | 2 | 3 | 4 | 5
  logo?: ReactNode
  variant?: TestimonialVariant
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const variantClasses: Record<TestimonialVariant, string> = {
  default: "rounded-2xl border border-zinc-200 bg-white shadow-sm",
  outlined: "rounded-2xl border border-zinc-200 bg-transparent",
  filled: "rounded-2xl border border-zinc-900 bg-zinc-900",
  minimal: "bg-transparent",
}

const quoteStyles: Record<TestimonialVariant, string> = {
  default: "text-zinc-700",
  outlined: "text-zinc-700",
  filled: "text-zinc-100",
  minimal: "text-zinc-700",
}

const nameStyles: Record<TestimonialVariant, string> = {
  default: "text-zinc-900",
  outlined: "text-zinc-900",
  filled: "text-white",
  minimal: "text-zinc-900",
}

const metaStyles: Record<TestimonialVariant, string> = {
  default: "text-zinc-400",
  outlined: "text-zinc-400",
  filled: "text-zinc-500",
  minimal: "text-zinc-400",
}

const dividerStyles: Record<TestimonialVariant, string> = {
  default: "border-zinc-200",
  outlined: "border-zinc-200",
  filled: "border-zinc-800",
  minimal: "border-transparent",
}

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="mb-4 flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={cn("h-4 w-4", i < rating ? "text-amber-400" : "text-zinc-200")}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({
  src,
  alt = "",
  name,
  variant,
}: {
  src?: string
  alt?: string
  name: string
  variant: TestimonialVariant
}) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name}
        className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10"
      />
    )
  }

  const bgColor: Record<TestimonialVariant, string> = {
    default: "bg-zinc-200 text-zinc-700",
    outlined: "bg-zinc-200 text-zinc-700",
    filled: "bg-zinc-700 text-zinc-300",
    minimal: "bg-zinc-200 text-zinc-700",
  }

  return (
    <div
      className={cn(
        "flex h-10 w-10 select-none items-center justify-center rounded-full text-xs font-semibold",
        bgColor[variant]
      )}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export const TestimonialCard = forwardRef<HTMLElement, TestimonialCardProps>(
  function TestimonialCard(
    {
      quote,
      authorName,
      authorRole,
      company,
      avatarSrc,
      avatarAlt,
      rating,
      logo,
      variant = "default",
      className,
      ...props
    },
    ref
  ) {
    const pad = variant === "minimal" ? "py-2" : "p-7"

    return (
      <figure
        ref={ref}
        className={cn("flex flex-col", variantClasses[variant], pad, className)}
        {...props}
      >
        {logo && <div className="mb-5 opacity-60">{logo}</div>}

        {rating && <Stars rating={rating} />}

        <blockquote className={cn("flex-1 text-sm leading-relaxed", quoteStyles[variant])}>
          <span
            aria-hidden="true"
            className={cn(
              "mb-2 -mt-1 block select-none font-serif text-3xl leading-none",
              variant === "filled" ? "text-zinc-700" : "text-zinc-200"
            )}
          >
            &ldquo;
          </span>
          {quote}
        </blockquote>

        <figcaption
          className={cn(
            "mt-6 flex items-center gap-3 pt-5 border-t",
            dividerStyles[variant]
          )}
        >
          <Avatar
            src={avatarSrc}
            alt={avatarAlt}
            name={authorName}
            variant={variant}
          />

          <div className="min-w-0">
            <p className={cn("truncate text-sm font-semibold leading-tight", nameStyles[variant])}>
              {authorName}
            </p>

            {(authorRole || company) && (
              <p className={cn("mt-0.5 truncate text-xs", metaStyles[variant])}>
                {authorRole}
                {authorRole && company && " · "}
                {company}
              </p>
            )}
          </div>
        </figcaption>
      </figure>
    )
  }
)

TestimonialCard.displayName = "TestimonialCard"