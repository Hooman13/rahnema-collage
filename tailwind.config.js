const { faVectorSquare } = require("@fortawesome/free-solid-svg-icons");
const { url } = require("inspector");
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    fontFamily: {
      sans: ["IRANSansX"],
    },
    extend: {
      fontSize: {  
        'xs-5':  '0.5rem' /* 8px */,
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
