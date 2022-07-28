/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors:{
        primary:{
          DEFAULT:"#3D1673",
          darkBlue:"#1B2430",
          gray:"#292A30",
          backGray:"#1F2025",
          indigo:"#304EF2",
          fuchsia:"#D93654",
          lilac:"#BFA7F2"

        },
        avatar: {
          skyBlue:"#049DD9",
          orange:"#F25922",
          fuchsia:"#D93654",
          greeMarine:"#2EA67A",
          indigo:"#304EF2"
        }
        }
    },
  },
  plugins: [require('flowbite/plugin')],
}
