/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkOne: "#15191E",
        darkTwo: "#191E24",
        darkThree: "#1D232A",
        lightTwo: "#F2F2F2",
        lightThree: "#E5E6E6",
      },
      fontFamily: {
        aclonica: ["Aclonica", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
  darkMode: "class",
};
