import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme')
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#6C5CE7',
          secondary: '#00CECE',
          background: '#FFFFFF',
          text: '#0F0F1A',
          accent: '#FF6B6B',
        },
        dark: {
          primary: '#8A7BFF',
          secondary: '#00FFFF',
          background: '#0F0F1A',
          text: '#FFFFFF',
          accent: '#FF8A8A',
        },
      },
      fontFamily:{
        nebulica:"Nebulica Bold",
        nebu:"BB Manual",
        sans:["'M PLUS Rounded 1c'", ...defaultTheme.fontFamily.sans],
        mPlus: ["'M PLUS Rounded 1c'", ...defaultTheme.fontFamily.sans],
      },
      fontWeight:{
        thin: '100',
        light: '300',
        regular: '400',
        medium: '500',
        bold: '700',
        extrabold: '800',
        black: '900',
      }
    },
  },
  plugins: [],
  darkMode: 'class'
};
export default config;
