/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/options.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('@tailwindcss/forms')],
}
