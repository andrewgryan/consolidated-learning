const heroPatterns = require("tailwind-heropatterns")({
    variants: [],
    patterns: ["death-star", "hexagons", "circuit-board", "polka-dots", "signal"],
    colors: {
        default: "#9C92AC",
        "white": "#FFFFFF"
    },
    opacity: {
        default: "0.4",
        "100": "1.0"
    }
});

module.exports = {
  purge: [ "*.html" ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [ heroPatterns ],
}
