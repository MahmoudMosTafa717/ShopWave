/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./src/**/*.{html,js,jsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        'amazon-orange': '#ff9900',
        'amazon-blue': '#146eb4',
        'amazon-dark': '#232f3e',
        'amazon-light': '#f2f2f2',
        'amazon-black': '#000000',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
