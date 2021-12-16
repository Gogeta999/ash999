module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'evagreen': { DEFAULT: "#A2DA5A" },
        'darkBG' : { DEFAULT: "#2f3437"}, 
        'darkTxt' : { DEFAULT: "#e8e8ea"},
      },
     
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
