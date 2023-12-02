"use strict";

let path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/js/main.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist/js",
  },
  watch: true,

  devtool: "source-map",

  module: {},
  node: {
    fs: "empty",
  },
  resolve: {
    fallback: {
      fs: require.resolve("browserify-fs"),
      path: require.resolve("path-browserify"),
    },
  },
};
