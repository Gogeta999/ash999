module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        evagreen: { DEFAULT: "#A2DA5A" },
        darkBG: { DEFAULT: "#2f3437" },
        darkTxt: { DEFAULT: "#e8e8ea" },
        twitterBlue: { DEFAULT: "#1DA1F2" },
        instagramPink: { DEFAULT: "#C13584" },
      },
      rotate: {
        135: "135deg",
        225: "225deg",
      },
    },
  },
  variants: {
    animation: ["responsive", "hover", "focus"],
    transitionDelay: ["responsive", "hover", "focus"],
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
