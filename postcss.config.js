export default {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 100,
      propList: ["*"],
      minPixelValue: 2,
    },
  },
};
