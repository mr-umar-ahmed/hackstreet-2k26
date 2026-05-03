import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0B0B',
        accent: '#00FFC2', 
        'accent-dim': '#00cc9b',
      },
    },
  },
  plugins: [],
};

export default config;