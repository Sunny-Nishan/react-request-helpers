const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html"
});
module.exports = {
  entry: {
    main: "./src/demo/index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [htmlPlugin],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "src/demo")
  }
};
