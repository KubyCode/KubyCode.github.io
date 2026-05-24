const { color } = require("framer-motion");

module.exports = {
  darkMode: "class", // * Habilita el modo dark por clase
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // * Colores personalizados para el dark mode
        dark: {
          background: "#1a202c",
          text: "#f7fafc",
          card: "#2d3748",
        },
      },
    },
  },
  plugins: [],
};
