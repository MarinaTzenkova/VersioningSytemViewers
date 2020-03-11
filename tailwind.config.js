//default config https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
const { fontFamily, spacing } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      colors: {
        orange: {
          100: "#FBEEDC",
          200: "#F8D9AE",
          300: "#F8C47B",
          400: "#F1B560",
          500: "#EDA949",
          600: "#D5881B",
          700: "#A86506",
          800: "#744400",
          900: "#5B2C00"
        },
        blue: {
          100: "#EDF7FE",
          200: "#C5E0F7",
          300: "#9CCBF2",
          400: "#6CABEA",
          500: "#4A8FDE",
          600: "#277DCE",
          700: "#236AAF",
          800: "#2C4F89",
          900: "#27416E"
        }
      },
      spacing: {
        "26": "6.5rem",
        "80": "20rem"
      },
      maxWidth: {
        "7xl": "80rem",
        "8xl": "100rem"
      },
      maxHeight: {
        ...spacing
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "2rem",
        "3xl": "4rem"
      },
      fontFamily: {
        sans: ["Open Sans", "Source Sans Pro", ...fontFamily.sans]
      },
      fontSize: {
        "2xs": "0.65rem",
        "3xs": "0.5rem"
      }
    },
    container: {
      center: true
    }
  },
  variants: {
    boxShadow: ["responsive", "hover", "focus", "group-hover"]
  },
  corePlugins: {},
  plugins: [require("@tailwindcss/custom-forms")]
};
