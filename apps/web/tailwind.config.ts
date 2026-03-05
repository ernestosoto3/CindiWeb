import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#c8f55a',
        surface: '#111110',
      },
    },
  },
  plugins: [],
}

export default config
