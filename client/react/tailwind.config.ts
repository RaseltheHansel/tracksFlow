import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        track: {
          bg:      '#0b0e1a',
          surface: '#0f1426',
          card:    '#141b31',
          border:  '#27304d',
          accent:  '#38bdf8',
          green:   '#4ade80',
          red:     '#f87171',
          yellow:  '#fbbf24',
          text:    '#eef1f7',
          muted:   '#9aa3b2',
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
