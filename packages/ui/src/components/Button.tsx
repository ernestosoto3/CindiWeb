import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const styles = {
  primary: {
    background: '#c8f55a',
    color: '#0a0a08',
    border: 'none',
    fontWeight: 700,
  },
  ghost: {
    background: 'transparent',
    color: '#e8e8e2',
    border: '1px solid #222220',
    fontWeight: 400,
  },
  sizes: {
    sm: { fontSize: '11px', padding: '6px 14px' },
    md: { fontSize: '13px', padding: '10px 20px' },
    lg: { fontSize: '14px', padding: '14px 28px' },
  },
}

export function Button({ variant = 'primary', size = 'md', children, style, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        ...styles[variant],
        ...styles.sizes[size],
        cursor: 'pointer',
        borderRadius: '2px',
        letterSpacing: '0.02em',
        fontFamily: 'inherit',
        ...style,
      }}
    >
      {children}
    </button>
  )
}
