/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "card-1": "fdefe6",
        "card-2": "#d6e5fb",
        "card-3": "#ceebe9",
        "card-4": "#e2f2b2",
        primary: "#0a1d37",
        hero: "#d6e5fb",
        heading: "#0a1d37",
        small: "#999",
        "deep-blue": "#192a56",
      },
    },
  },
  plugins: [],
};
