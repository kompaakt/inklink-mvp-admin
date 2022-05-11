module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      minWidth: {
        160: '160px',
      },
    },
  },

  plugins: [require('@tailwindcss/forms')],
};
