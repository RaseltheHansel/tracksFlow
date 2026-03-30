import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        track: {
          bg:      '#0a0f1e',  // deep navy background
          surface: '#111827',  // card background
          card:    '#1f2937',  // elevated card
          border:  '#374151',  // borders
          accent:  '#3b82f6',  // blue accent
          green:   '#10b981',  // positive metrics
          red:     '#ef4444',  // negative metrics
          yellow:  '#f59e0b',  // warnings
          text:    '#f9fafb',  // primary text
          muted:   '#9ca3af',  // secondary text
          soft:    '#d1d5db',  // soft text
        },
      },
      fontFamily: {
        sans:  ['Inter', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
    },
  },
} satisfies Config;
