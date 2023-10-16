const HtmlBundlerPlugin = require("html-bundler-webpack-plugin")
const path = require("path")

module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      entry: "./out/",

      js: {
        filename: "assets/js/[name].[contenthash:8].js",
        inline: true, // inlines JS into HTML
      },
      css: {
        filename: "assets/css/[name].[contenthash:8].css",
        inline: true, // inlines CSS into HTML
      }
    })
  ],

  mode: "production",
}
