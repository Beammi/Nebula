/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        // 'sans': ['Roboto', 'sans-serif'],
        'sans': ['Ubuntu', 'sans-serif'],
      },
    },
    colors:{
      'blue': '#544CE6',
      'red': '#FF5050',
      'yellow': '#FFC517',
      'dark-grey': '#EAE8E9',
      'grey': '#EBEBEB',
      'light-grey': '#F4F4F4',
      'white': '#ffffff',
      'black': '#000000',
    }
  },
  plugins: [require("daisyui")],
}
