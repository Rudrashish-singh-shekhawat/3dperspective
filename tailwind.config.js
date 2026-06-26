/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#e8e6df',
        'ink-dim': '#7a7870',
        'ink-mute': '#3d3c3a',
        surface: '#0d0d0c',
        panel: 'rgba(14,14,13,0.88)',
        'panel-solid': '#0e0e0d',
        rule: '#222220',
        blue: '#4d9fff',
        green: '#3ecf8e',
        red: '#f47c5a',
        purple: '#a78bfa',
        amber: '#f5a623',
        cyan: '#22d3ee',
        section: {
          hero: '#0f0f0f',
          about: '#0f1318',
          projects: '#13120f',
          contact: '#110f15',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'SF Mono', 'ui-monospace', 'monospace'],
        sketch: ['"Architects Daughter"', 'cursive'],
        body: ['"Nunito"', 'sans-serif'],
      },
      animation: {
        gradientShift: 'gradientShift 6s ease infinite',
        fadeSlideIn: 'fadeSlideIn 0.3s ease-out both',
        borderPulse: 'borderPulse 3s ease-in-out infinite',
        glowPulseGreen: 'glowPulseGreen 2.5s ease-in-out infinite',
        float: 'float 8s ease-in-out infinite',
        'float-delay': 'float 10s ease-in-out 3s infinite',
        'draw-in': 'drawIn 1s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        borderPulse: {
          '0%, 100%': { borderColor: 'rgba(77,159,255,0.35)' },
          '50%': { borderColor: 'rgba(77,159,255,0.7)' },
        },
        glowPulseGreen: {
          '0%, 100%': { boxShadow: '0 0 6px rgba(62,207,142,0.25)' },
          '50%': { boxShadow: '0 0 16px rgba(62,207,142,0.55)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        drawIn: {
          '0%': { strokeDashoffset: '100', opacity: '0' },
          '100%': { strokeDashoffset: '0', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
