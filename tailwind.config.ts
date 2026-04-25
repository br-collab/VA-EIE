import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'va-navy':       '#112F4E',
        'va-blue':       '#0071BC',
        'va-blue-dark':  '#003E73',
        'va-gold':       '#FACE00',
        'va-white':      '#FFFFFF',
        'va-gray-light': '#F1F1F1',
        'va-gray-mid':   '#5B616B',
        'va-gray-dark':  '#212121',
        'va-green':      '#2E8540',
        'va-red':        '#CD2026',
        'va-amber':      '#FF7733',
        'va-border':     '#D6D7D9',
      },
      fontFamily: {
        'dm-mono':   ['DM Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        'dm-serif':  ['DM Serif Display', 'Georgia', 'serif'],
        'sans':      ['Source Sans Pro', 'Public Sans', 'system-ui', 'sans-serif'],
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      boxShadow: {
        'focus': '0 0 0 3px rgba(0, 113, 188, 0.4)',
      },
    },
  },
  plugins: [],
}

export default config
