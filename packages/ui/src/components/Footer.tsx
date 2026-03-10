import type { ReactNode } from "react"

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterLinkGroup {
  heading: string
  links: FooterLink[]
}

type FooterVariant = "default" | "minimal" | "dark"

export interface FooterProps {
  brandName: string
  tagline?: string
  logo?: ReactNode
  /**
   * Grouped nav columns — renders a multi-column layout.
   * When provided, `links` is ignored.
   */
  linkGroups?: FooterLinkGroup[]
  /**
   * Simple flat links — renders a single-row layout.
   * Used when linkGroups is not provided.
   */
  links?: FooterLink[]
  bottomRight?: ReactNode
  copyright?: ReactNode
  variant?: FooterVariant
  className?: string
}

const wrapperStyles: Record<FooterVariant, string> = {
  default: "border-t border-zinc-200 bg-white text-zinc-600",
  minimal: "border-t border-zinc-100 bg-zinc-50 text-zinc-500",
  dark: "border-t border-zinc-800 bg-zinc-950 text-zinc-400",
}

const brandStyles: Record<FooterVariant, string> = {
  default: "text-zinc-900",
  minimal: "text-zinc-800",
  dark: "text-zinc-100",
}

const headingStyles: Record<FooterVariant, string> = {
  default: "text-zinc-900",
  minimal: "text-zinc-700",
  dark: "text-zinc-200",
}

const linkStyles: Record<FooterVariant, string> = {
  default: "text-zinc-500 hover:text-zinc-900",
  minimal: "text-zinc-400 hover:text-zinc-700",
  dark: "text-zinc-400 hover:text-zinc-100",
}

const dividerStyles: Record<FooterVariant, string> = {
  default: "border-zinc-200",
  minimal: "border-zinc-100",
  dark: "border-zinc-800",
}

function ColumnarFooter({
  brandName,
  tagline,
  logo,
  linkGroups,
  variant,
}: Required<Pick<FooterProps, "brandName" | "linkGroups" | "variant">> &
  Pick<FooterProps, "tagline" | "logo">) {
  const visibleGroups = linkGroups.slice(0, 4)
  const totalCols = visibleGroups.length + 1

  const gridClass: Record<number, string> = {
    2: "grid-cols-2 md:grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-5",
  }

  return (
    <div
      className={cn(
        "grid gap-10 py-14",
        gridClass[totalCols] ?? "grid-cols-2 md:grid-cols-4"
      )}
    >
      <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
        {logo ? <div className="mb-1">{logo}</div> : null}

        <span className={cn("text-base font-semibold tracking-tight", brandStyles[variant])}>
          {brandName}
        </span>

        {tagline ? <p className="max-w-xs text-sm leading-relaxed">{tagline}</p> : null}
      </div>

      {visibleGroups.map((group) => (
        <div key={group.heading} className="flex flex-col gap-3">
          <h3
            className={cn(
              "text-xs font-semibold uppercase tracking-widest",
              headingStyles[variant]
            )}
          >
            {group.heading}
          </h3>

          <ul className="flex flex-col gap-2.5" role="list">
            {group.links.map((link, index) => (
              <li key={`${group.heading}-${link.href}-${index}`}>
                <a
                  href={link.href}
                  className={cn("text-sm transition-colors duration-150", linkStyles[variant])}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function MinimalFooter({
  brandName,
  tagline,
  logo,
  links,
  variant,
}: Required<Pick<FooterProps, "brandName" | "links" | "variant">> &
  Pick<FooterProps, "tagline" | "logo">) {
  return (
    <div className="flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        {logo ? <div>{logo}</div> : null}

        <span className={cn("text-base font-semibold tracking-tight", brandStyles[variant])}>
          {brandName}
        </span>

        {tagline ? <span className="hidden text-sm sm:inline">{tagline}</span> : null}
      </div>

      {links.length > 0 ? (
        <ul className="flex flex-wrap gap-5" role="list">
          {links.map((link, index) => (
            <li key={`${link.href}-${index}`}>
              <a
                href={link.href}
                className={cn("text-sm transition-colors duration-150", linkStyles[variant])}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function Footer({
  brandName,
  tagline,
  logo,
  linkGroups,
  links = [],
  bottomRight,
  copyright,
  variant = "default",
  className,
}: FooterProps) {
  const year = new Date().getFullYear()
  const hasColumns = Boolean(linkGroups?.length)

  return (
    <footer className={cn(wrapperStyles[variant], className)}>
      <div className="mx-auto max-w-7xl px-6">
        {hasColumns ? (
          <ColumnarFooter
            brandName={brandName}
            tagline={tagline}
            logo={logo}
            linkGroups={linkGroups!}
            variant={variant}
          />
        ) : (
          <MinimalFooter
            brandName={brandName}
            tagline={tagline}
            logo={logo}
            links={links}
            variant={variant}
          />
        )}

        <div
          className={cn(
            "flex flex-col items-start justify-between gap-3 border-t py-5 text-left sm:flex-row sm:items-center",
            dividerStyles[variant]
          )}
        >
          <p className="text-xs">
            {copyright ?? (
              <>
                © {year} {brandName}. All rights reserved.
              </>
            )}
          </p>

          {bottomRight ? (
            <div className="flex items-center gap-4 text-xs">{bottomRight}</div>
          ) : null}
        </div>
      </div>
    </footer>
  )
}