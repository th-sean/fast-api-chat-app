/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      'custom': '1000px',
     },
   },
   variants: {
     extend: {},
   },
   plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
   ],
 }