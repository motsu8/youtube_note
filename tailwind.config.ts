/** @type {import('tailwindcss').Config} */

const config = {
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
      height: {
        '9/10': '90%',
      },
      colors: {
        main: '#FFFBF8',
        base: '#BD3246',
        accent: '#E0822A',
        'accent-dark': '#B86B23',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border)-(main|base|accent)/,
      variants: ['hover'],
    },
    'right-3',
    'top-3',
    'hover:bg-neutral-100',
    'hover:shadow',
  ],
};

module.exports = config;
