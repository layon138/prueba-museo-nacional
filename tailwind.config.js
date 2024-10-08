/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#F3FFBD',
      'primary': '#247BA0',
      'secondary':'#0A0C16',
      'other': '#B2DBBF',
      'likes':'#FF1654',
      'gray':'#9F9D92',
      'success':'#247BA0'
    },
  },
  plugins: [],
}

