/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--bg-primary) / <alpha-value>)',
        card: 'rgb(var(--bg-card) / <alpha-value>)',
        textMain: 'rgb(var(--text-primary) / <alpha-value>)',
        textMuted: 'rgb(var(--text-muted) / <alpha-value>)',
        accentPrimary: 'rgb(var(--accent-primary) / <alpha-value>)',
        accentSecondary: 'rgb(var(--accent-secondary) / <alpha-value>)',
        success: 'rgb(var(--success-tag) / <alpha-value>)',
        divider: 'rgb(var(--border-color) / <alpha-value>)',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
