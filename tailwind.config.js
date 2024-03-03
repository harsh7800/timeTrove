const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".btn-black": {
          backgroundColor: "#000", // Replace with your preferred background color
          color: "#fff", // Replace with your preferred text color
          "&:hover": {
            color: "#000", // Replace with your preferred hover text color
            backgroundColor: "#fff", // Replace with your preferred hover background color
            borderColor: "currentColor", // Specify border color if needed
            transition: "all",
          },
        },
      });
    }),
  ],
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xs: "400px",
        md: "550px",
        lg: "900px",
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      boxShadow: {
        shadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        "shadow-2": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      },
      colors: {
        grey: "#f2f2f2",
        "grey.200": "#e6e6e6",
        purple: "#c44dff",
      },

      // fontFamily: {
      //   poppins: ["var(--font-poppins)"],
      //   noto_serif_display: ["var(--font-noto_serif_display"],
      // },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backdropBlur: {
        shoe: "url(https://sneakernews.com/wp-content/uploads/2020/10/jordan-1-black-mocha-555088-105-2.jpg)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwindcss-animated")],
};
