/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        lila: "2px 4px 8px rgba(169,141,228, 1)",
        blue: "2px 4px 8px rgba(73, 163, 222  , 1)",
        white: "2px 4px 8px rgba(255, 255, 255  , 1)",
      },
      colors: {
        primary: "#461220",
        secondary: "#8c2f39",
        tertiary: "#fcb9b2",
      },
      backgroundImage: {
        hero: "url('/src/assets/img/background-modal.jpg')",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
