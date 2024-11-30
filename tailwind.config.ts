import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F06071',
        secondary: '#F4C2C3',

        // member colors
        blue: '#69B0CB',
        purple: '#8E5AB4',
        red: '#D75750',
        pink: '#E292B4',
        lemon: '#E9CC48',
        green: '#5D9767',
        orange: '#F5A623',
      },
    },
  },
  plugins: [],
}
export default config
