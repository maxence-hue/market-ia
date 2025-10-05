import { fontFamily } from 'tailwindcss/defaultTheme';

/******************************************
 * Tailwind configuration for Market-IA.
 *****************************************/
const config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',
        accent: '#22D3EE',
        dark: '#050014',
        night: {
          900: '#050014',
          800: '#0B0320',
          700: '#15093C',
        },
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
