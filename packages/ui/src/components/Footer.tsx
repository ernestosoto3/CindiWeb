interface FooterLink {
  label: string
  href: string
}

export interface FooterProps {
  brandName: string
  links?: FooterLink[]
}

export function Footer({ brandName, links = [] }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {brandName}
        </p>

        <ul className="flex gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-gray-500 transition-colors hover:text-black">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}