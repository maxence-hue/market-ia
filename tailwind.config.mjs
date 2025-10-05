import { fontFamily } from 'tailwindcss/defaultTheme';

/******************************************
 * Tailwind configuration for Market-IA.
 *****************************************/
const config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1A56DB',
        accent: '#0EA5E9',
        dark: '#0F172A',
      },
      fontFamily: {
        sans: ['"Inter var"', ...fontFamily.sans],
      },
      boxShadow: {
        subtle: '0 10px 30px -12px rgba(15, 23, 42, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
