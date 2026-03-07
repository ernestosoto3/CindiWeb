import type { ReactNode } from "react"

interface NavLink {
  label: string
  href: string
}

export interface NavbarProps {
  logo: ReactNode
  links?: NavLink[]
  cta?: ReactNode
}

export function Navbar({ logo, links = [], cta }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex-shrink-0">{logo}</div>

      <ul className="hidden items-center gap-6 md:flex">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-sm text-gray-600 transition-colors hover:text-black">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {cta ? <div className="flex-shrink-0">{cta}</div> : null}
    </nav>
  )
}