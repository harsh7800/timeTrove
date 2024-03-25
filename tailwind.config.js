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
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
      boxShadow: {
        shadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        "shadow-2": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        "shadow-3":
          "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
        "shadow-4":
          "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
      },
      colors: {
        grey: "#f2f2f2",
        "grey.200": "#e6e6e6",
        purple: "#c44dff",
        "purple.200": "#b366ff",
      },

      // fontFamily: {
      //   poppins: ["var(--font-poppins)"],
      //   noto_serif_display: ["var(--font-noto_serif_display"],
      // },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
      backdropBlur: {
        shoe: "url(https://sneakernews.com/wp-content/uploads/2020/10/jordan-1-black-mocha-555088-105-2.jpg)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwindcss-animated")],
  loaders: [
    {
      test: /\.html$/,
      loader: "html-loader?attrs[]=video:src",
    },
    {
      test: /\.mp4$/,
      loader: "url?limit=10000&mimetype=video/mp4",
    },
  ],
};

// Button code
{
  /* <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  Shimmer
</button>; */
}

// tailwind.config.js code
