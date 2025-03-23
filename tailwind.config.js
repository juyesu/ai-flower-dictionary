/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
      screens: {
        mobile: '320px',
        fhd: '1920px',
        qhd: '2560px',
      },
      boxShadow: {
        'custom-all':
          '0 8px 16px rgba(0, 0, 0, 0.15), 0 -2px 2px rgba(0, 0, 0, 0.1), 4px 0 10px rgba(0, 0, 0, 0.1), -4px 0 10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
