/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"DM Mono"', 'monospace'],
        serif: ['"Shippori Mincho"', 'serif'],
      },
      colors: {
        ink: '#0e0e0e',
        ink2: '#3a3a3a',
        ink3: '#777',
        ink4: '#aaa',
        surface: '#f7f6f2',
        accent: '#c8392b',
      },
    },
  },
  plugins: [],
};
