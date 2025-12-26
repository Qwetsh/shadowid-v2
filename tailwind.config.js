/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0e27',
          darker: '#050810',
          border: '#1a2a4a',
          neon: {
            cyan: '#00f0ff',
            pink: '#ff006e',
            purple: '#b537f2',
            green: '#39ff14',
            yellow: '#ffed4e',
          }
        }
      },
      fontFamily: {
        cyber: ['Courier New', 'monospace'],
        display: ['Arial Black', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'scan': 'scan 8s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', textShadow: '0 0 10px currentColor' },
          '50%': { opacity: '0.7', textShadow: '0 0 20px currentColor' },
        }
      },
    },
  },
  plugins: [],
}
