const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        windSong: ['var(--font-windSong)'],
        greatVibes: ['var(--font-greatVibes)'],
      },
      colors: {
        customBeige: 'rgb(221, 208, 200)',
        blushPink: '#FFD1DC',
        coralPink: '#F88379',
        customBlack: '#363636',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        bounceUp: {
          '33%, 100%': { top: '0' },
          '66%': { top: '20px' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100% ': { opacity: 0.2 },
        },
        dotFlashing: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        blink: 'blink 1.4s both infinite',
        bounceUp: 'bounceUp 2.5s infinite',
        dotFlashing: 'dotFlashing 1s infinite linear',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            };
          },
        },
        {
          values: theme('transitionDelay'),
        },
      );
    }),
  ],
};
