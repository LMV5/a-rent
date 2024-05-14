/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      gridTemplateColumns: {
        "70-50": "70% 50%",
      },
    },
    screens: {
      ssm: "400px",
      sm: "600px",
      md: "800px",
    },
    colors: {
      gray: "#262626",
      slateBlue: "#7A89C2",
      periwinkle: "#B1C7EE",
      teaGreen: "#CBF3D1",
      persianGreen: "#1B998B",
      red: "#ED254E",
      cosmicLatte: "#F8F4E3",
    },
  },
  plugins: [],
};
