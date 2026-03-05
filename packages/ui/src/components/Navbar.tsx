import React from 'react'

export interface NavbarProps {
  logo?: string
  links?: Array<{ label: string; href: string }>
  cta?: { label: string; href: string }
}

export function Navbar({ logo = 'WebCraft', links = [], cta }: NavbarProps) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 40px',
        borderBottom: '1px solid #222220',
      }}
    >
      <span style={{ fontWeight: 700, fontSize: '16px' }}>{logo}</span>
      <ul style={{ display: 'flex', gap: '28px', listStyle: 'none', margin: 0, padding: 0 }}>
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              style={{ fontSize: '13px', color: '#999990', textDecoration: 'none' }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      {cta && (
        <a
          href={cta.href}
          style={{
            fontSize: '12px',
            padding: '8px 18px',
            background: '#c8f55a',
            color: '#0a0a08',
            fontWeight: 700,
            textDecoration: 'none',
            borderRadius: '2px',
          }}
        >
          {cta.label}
        </a>
      )}
    </nav>
  )
}
