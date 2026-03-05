import React from 'react'

export interface FooterProps {
  companyName?: string
  year?: number
}

export function Footer({ companyName = 'WebCraft', year = new Date().getFullYear() }: FooterProps) {
  return (
    <footer
      style={{
        borderTop: '1px solid #222220',
        padding: '28px 40px',
        fontSize: '11px',
        color: '#666660',
      }}
    >
      © {year} {companyName}. All rights reserved.
    </footer>
  )
}
