import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme.js';

export default {
	content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
			},
			aria: {
				invalid: 'invalid="true"',
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
} satisfies Config;
