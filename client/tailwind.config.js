/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const flowbite = require("flowbite-react/tailwind");
// eslint-disable-next-line no-undef
const scrollbar = require('tailwind-scrollbar');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // ...
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Add Flowbite plugin
    flowbite.plugin(),
    
    // Add Tailwind scrollbar plugin (no method call needed)
    scrollbar,
  ],
}
