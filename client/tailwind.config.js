// module.exports = {
//   // purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     fontFamily: {
//       display: ["Open Sans", "sans-serif"],
//       body: ["Open Sans", "sans-serif"],
//     },
//     extend: {
//       screens: {
//         mf: "990px",
//       },
//       keyframes: {
//         "slide-in": {
//           "0%": {
//             "-webkit-transform": "translateX(120%)",
//             transform: "translateX(120%)",
//           },
//           "100%": {
//             "-webkit-transform": "translateX(0%)",
//             transform: "translateX(0%)",
//           },
//         },
//       },
//       animation: {
//         "slide-in": "slide-in 0.5s ease-out",
//       },
//     },
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [require("@tailwindcss/forms")],
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
              mf: "990px",
        },
        keyframes: {
                   "slide-in": {
                   "0%": {
                       "-webkit-transform": "translateX(120%)",
                       transform: "translateX(120%)",
                     },
                   "100%": {
                       "-webkit-transform": "translateX(0%)",
                       transform: "translateX(0%)",
                    },
                  },
                 },
                 animation: {
                          "slide-in": "slide-in 0.5s ease-out",
                         }
    },
  },
  plugins: [],
}