import flowbite from "flowbite-react/tailwind";

/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), flowbite.plugin()],
};
