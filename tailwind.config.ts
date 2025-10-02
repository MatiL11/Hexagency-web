import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'hex-black': '#000000',
        'hex-white': '#ffffff',
        'hex-gray': '#f8f9fa',
      }
    },
  },
} satisfies Config
