module.exports = {
  theme: {
    fontFamily: {
      main: ["Roboto", "sans-serif"],
      label: ['"Source Sans Pro"', "sans-serif"]
    },
    extend: {
      boxShadow: {
        'black': '0 20px 25px -5px var(--color-shadow), 0 10px 10px -5px var(--color-shadow)'
      },
      colors: {
        primary: "var(--color-primary)",
        bg: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          tertiary: "var(--color-toggle-bg)",
          notification: "var(--color-notification)"
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
