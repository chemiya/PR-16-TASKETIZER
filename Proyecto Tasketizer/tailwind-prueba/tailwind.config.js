/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
       
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      
    },
    colors:{
      "azul-oscuro":"#0223D8",
      "azul-claro":"#12A4A4",
      "naranja-oscuro":"#d96100",
      "naranja-claro":"#ff7e00",
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
"negro":"#000000",
      'gradientePrimero': '#f6d365',
      "rojo":"#FF0000",
      "verde":"#008000",

      'gradienteFinal': '#fda085',
      "grisClaro":"#c2c2c2",
      "grisOscuro":"#646464"
      

    },
  },

  plugins: [],
}
