module.exports = {
  // ... other config
  theme: {
    extend: {
      fontFamily: {
        'inherit': 'inherit'
      },
      keyframes: {
        'border-x': {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
        'border-y': {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'border-x': 'border-x 3s ease-in-out infinite',
        'border-y': 'border-y 3s ease-in-out infinite',
      },
    },
  },
}