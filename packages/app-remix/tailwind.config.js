module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: "1fr minmax(auto, 36rem) 1fr",
      },
    },
  },
  plugins: [],
};
