/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        warren: {
          bg: '#0A0D12',
          surface: '#12171F',
          card: '#1A212D',
          border: '#2A3342',
          teal: '#00D2FF',
          emerald: '#10B981',
          purple: '#A855F7',
          amber: '#F59E0B',
          coral: '#EF4444',
          slate: '#64748B',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
