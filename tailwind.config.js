/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				customBlue: '#EAF0F7',
				customGray: '#4F555A',
				customBtn: '#4461F2',

			},
			width: {
				'95/100': '95%',
			},
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require("daisyui")],
};
