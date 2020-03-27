module.exports = {
  theme: {
    colors: {
      primary: "var(--color-primary)",
      background: {
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
    fontFamily: {
      main: ["Roboto", "sans-serif"],
      label: ['"Source Sans Pro"', "sans-serif"]
    },
    extend: {
      gridTemplateColumns: {
        'header': '30px 1fr 30px'
      }
    }
  }
};
