import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [
		forms,
		function ({ addBase }) {
			addBase({
				main: {
					maxWidth: '68rem',
					margin: '0 auto',
					padding: '2rem 1rem'
				},
				h1: {
					fontSize: '2.25rem',
					lineHeight: '1.3',
					fontWeight: '600',
					marginBottom: '1rem'
				},
				h2: {
					fontSize: '1.875rem',
					lineHeight: '1.3',
					fontWeight: '600',
					marginBottom: '0.75rem'
				},
				h3: {
					fontSize: '1.5rem',
					lineHeight: '1.4',
					fontWeight: '500',
					marginBottom: '0.75rem'
				},
				h4: {
					fontSize: '1.25rem',
					lineHeight: '1.4',
					fontWeight: '500',
					marginBottom: '0.5rem'
				}
			});
		}
	]
} satisfies Config;
