import type { Config } from "tailwindcss";

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
    },
  },
  plugins: [],
  darkMode: 'class'
};
export default config;
