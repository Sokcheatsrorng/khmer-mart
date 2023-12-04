/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
       colors:{
           primary_color: '#1A6E09',
           on_primary:'#FFFFFF',
           secondary_color: ' #FF9E37',
           accent_color: '#D50606',
           text_color: '#363636',
           bg_color: '#f5f5f5'
       },
       container: {
        padding: '4rem',
      },
    },
  },
  plugins: [],
}