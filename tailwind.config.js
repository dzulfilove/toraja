/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Libertinus Math"', "serif"],
      },
      colors: {
        toraja: {
          merah: "#8B0000",

          // Warna Sekunder
          emas: "#B8860B",

          // Warna Aksen
          hitam: "#2F4F4F",
          kuning: "#FFD700",

          // Warna Netral
          cokelat: "#8B4513",
          putih: "#F5F5DC",
        },
      },
    },
  },
  plugins: [],
};
