module.exports = {
  theme: {
    fontFamily: {
      main: ["Roboto", "sans-serif"],
      label: ['"Source Sans Pro"', "sans-serif"]
    },
    extend: {
      colors: {
        primary: "var(--color-primary)",
        bg: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)"
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          button: "var(--color-text-button)"
        },
        action: {
          delete: "var(--color-action-delete)"
        }
      },
      gridTemplateColumns: {
        'header': '30px 1fr 30px',
        'auto-1': 'auto 1fr'
      }
    }
  }
};
