"use client"

import { type ReactNode, useEffect, useId, useState } from "react"

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

export interface NavLink {
  label: string
  href: string
  active?: boolean
}

type NavbarVariant = "solid" | "transparent" | "bordered" | "floating"

export interface NavbarProps {
  logo?: ReactNode
  brandName?: string
  links?: NavLink[]
  cta?: ReactNode
  variant?: NavbarVariant
  /**
   * Animate from transparent → solid when the user scrolls down.
   * Best paired with variant="transparent".
   */
  scrollTransition?: boolean
  sticky?: boolean
  className?: string
}

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener("scroll", handler, { passive: true })
    handler()
    return () => window.removeEventListener("scroll", handler)
  }, [threshold])

  return scrolled
}

const variantStyles: Record<NavbarVariant, string> = {
  solid: "bg-white border-b border-zinc-100",
  transparent: "bg-transparent",
  bordered: "mx-4 mt-3 rounded-xl border border-zinc-200 bg-white",
  floating: "mx-4 mt-3 rounded-2xl border border-zinc-200/60 bg-white/90 backdrop-blur-md shadow-lg shadow-zinc-900/5",
}

const scrolledStyles =
  "bg-white/95 border-b border-zinc-100 shadow-sm shadow-zinc-900/5 backdrop-blur-sm"

const innerPadding: Record<NavbarVariant, string> = {
  solid: "mx-auto max-w-7xl px-6 py-4",
  transparent: "mx-auto max-w-7xl px-6 py-4",
  bordered: "px-5 py-3",
  floating: "px-5 py-3",
}

const mobileMenuStyles: Record<NavbarVariant, string> = {
  solid: "bg-white border-zinc-100",
  transparent: "bg-white/95 border-zinc-100 backdrop-blur-sm",
  bordered: "bg-white border-zinc-100",
  floating: "bg-white/95 border-zinc-100 backdrop-blur-sm",
}

function MenuButton({
  open,
  onClick,
  controls,
}: {
  open: boolean
  onClick: () => void
  controls: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? "Close menu" : "Open menu"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg md:hidden",
        "text-zinc-500 transition-colors duration-150",
        "hover:bg-zinc-100 hover:text-zinc-900",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
      )}
    >
      {open ? (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
  )
}

export function Navbar({
  logo,
  brandName = "Brand",
  links = [],
  cta,
  variant = "solid",
  scrollTransition = false,
  sticky = true,
  className,
}: NavbarProps) {
  const scrolled = useScrolled(20)
  const shouldUseScrolledState = variant === "transparent" && scrollTransition
  const isScrolled = shouldUseScrolledState && scrolled

  const [menuOpen, setMenuOpen] = useState(false)
  const mobileMenuId = useId()

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }

    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])

  const currentMobileMenuVariant = isScrolled ? "solid" : variant

  return (
    <header
      className={cn(
        "z-50 w-full transition-all duration-300 ease-in-out",
        sticky && "sticky top-0",
        !isScrolled && variantStyles[variant],
        isScrolled && scrolledStyles,
        className
      )}
    >
      <nav
        className={cn("flex items-center justify-between", innerPadding[variant])}
        aria-label="Main navigation"
      >
        <div className="shrink-0">
          {logo ?? (
            <span className="text-base font-semibold tracking-tight text-zinc-900">
              {brandName}
            </span>
          )}
        </div>

        {links.length > 0 ? (
          <ul className="hidden items-center gap-1 md:flex" role="list">
            {links.map((link, index) => (
              <li key={`${link.href}-${index}`}>
                <a
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150",
                    link.active
                      ? "bg-zinc-100 text-zinc-900"
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex items-center gap-2">
          {cta ? <div className="hidden items-center gap-2 md:flex">{cta}</div> : null}

          {links.length > 0 ? (
            <MenuButton
              open={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              controls={mobileMenuId}
            />
          ) : null}
        </div>
      </nav>

      {menuOpen ? (
        <div
          id={mobileMenuId}
          className={cn(
            "border-t px-4 pb-4 pt-2 md:hidden",
            mobileMenuStyles[currentMobileMenuVariant]
          )}
        >
          <ul className="flex flex-col gap-1" role="list">
            {links.map((link, index) => (
              <li key={`${link.href}-${index}`}>
                <a
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                    link.active
                      ? "bg-zinc-100 text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {cta ? (
            <div className="mt-3 border-t border-zinc-100 pt-3">{cta}</div>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}