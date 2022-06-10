module.exports = {
  darkMode: 'class',
  content: [
    "./public/*.html",
    "./src/App.vue",
    "./src/Resume.vue",
    "./src/components/*.{vue,js}",
    "./src/views/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadein 1s ease-in-out 1',
      },
      keyframes: {
        fadein: {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}