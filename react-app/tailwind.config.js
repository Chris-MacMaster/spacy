/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./public/**/*.{js,jsx,ts,tsx,pug,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    }
  ],
};
