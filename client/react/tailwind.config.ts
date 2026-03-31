import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        track: {
          bg:      '#0a0f1e',
          surface: '#111827',
          card:    '#0f172a',
          border:  '#1f2a44',
          accent:  '#22d3ee',
          accent2: '#38bdf8',
          lime:    '#a3e635',
          pink:    '#fb7185',
          orange:  '#f59e0b',
          green:   '#22c55e',
          red:     '#fb7185',
          yellow:  '#fbbf24',
          text:    '#e5e7eb',
          muted:   '#94a3b8',
          soft:    '#cbd5e1',
        },
      },
      fontFamily: {
        sans:  ['Space Grotesk', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
    },
  },
} satisfies Config;
