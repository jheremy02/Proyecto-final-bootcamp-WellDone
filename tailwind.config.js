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
          backGray:"#1F2025"
        }
        }
    },
  },
  plugins: [require('flowbite/plugin')],
}
