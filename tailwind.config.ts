import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        surface: '#12121a',
        'surface-2': '#1e1020',
        accent: '#e8102e',
        'accent-2': '#c0002a',
        text: '#f0e8ec',
        muted: '#7a5a62',
      },
      fontFamily: {
        heading: ['var(--font-space-mono)'],
        body: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
}

export default config
