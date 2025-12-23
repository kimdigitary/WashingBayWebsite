import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      colors: {
        // These reference the dynamic variables set up in globals.css
        theme: {
          red: '#DC2626',
          darkRed: '#991B1B',
          black: 'var(--theme-black)',
          surface: 'var(--theme-surface)',
          accent: 'var(--theme-accent)',
          text: 'var(--theme-text)',
          muted: 'var(--theme-muted)'
        },
        // IMPORTANT: Removed 'hsl()' wrapper because globals.css uses 'oklch'
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;