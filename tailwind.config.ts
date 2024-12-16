import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			black: {
  				'50': '#F5F5F5',
  				'100': '#DFDFDF',
  				'200': '#CACACA',
  				'300': '#B5B5B5',
  				'400': '#9F9F9F',
  				'500': '#8A8A8A',
  				'600': '#747474',
  				'700': '#5F5F5F',
  				'800': '#494949',
  				'900': '#343434',
  				'950': '#050505'
  			},
  			red: {
  				'50': '#FEECED',
  				'100': '#FCC3C8',
  				'200': '#F998A3',
  				'300': '#F7727E',
  				'400': '#F54459',
  				'500': '#F22134',
  				'600': '#DD001F',
  				'700': '#B30A1A',
  				'800': '#8C0814',
  				'900': '#62060E',
  				'950': '#3A0308'
  			},
  			green: {
  				'50': '#EBFEFC',
  				'100': '#C2FCF7',
  				'200': '#99FBF1',
  				'300': '#70F9EC',
  				'400': '#47F7E6',
  				'500': '#1EFE80',
  				'600': '#00DFCA',
  				'700': '#08BBA5',
  				'800': '#064C7F',
  				'900': '#064458',
  				'950': '#033B35'
  			},
  			purple: {
  				'50': '#F5E8FF',
  				'100': '#DFC0FF',
  				'200': '#C995FE',
  				'300': '#B368FE',
  				'400': '#9E43FE',
  				'500': '#8716FE',
  				'600': '#7101E7',
  				'700': '#5C01BD',
  				'800': '#480192',
  				'900': '#330167',
  				'950': '#1E003D'
  			},
  			orange: {
  				'50': '#FEF6EC',
  				'100': '#FBE4C4',
  				'200': '#F0D19C',
  				'300': '#F1A04D',
  				'400': '#F1A04D',
  				'500': '#ED9213',
  				'600': '#DB8510',
  				'700': '#B06C0D',
  				'800': '#88540A',
  				'900': '#613807',
  				'950': '#392304'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/typography'),
      require("tailwindcss-animate")
],
} satisfies Config;
