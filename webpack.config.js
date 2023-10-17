const path = require("path")
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin")

module.exports = {
  mode: "production",

  output: {
    // output directory of html with inlined assets
    path: path.join(__dirname, 'dist/'),
  },

  resolve: {
    alias: {
      // define alias for filenames in CSS started with `/_next`
      '/_next': path.join(__dirname, 'out/_next'),
    },
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: "./out/",

      // you can use it to process a single page, e.g., for debug
      // entry: {
      //   index: 'out/index.html',
      //   404: 'out/404.html',
      // },

      js: {
        // output filename of JS, used if inline is false
        //filename: "assets/js/[name].[contenthash:8].js",
        inline: true, // inlines JS into HTML
      },
      css: {
        // output filename of CSS, used if inline is false
        //filename: "assets/css/[name].[contenthash:8].css",
        inline: true, // inlines CSS into HTML
      },
      /**
       * Cleanup HTML generated via next.js from unless tags.
       * Called before a process to inline the resources to be used.
       *
       * @param {string} html The content of the html file defined in the entry option.
       * @param {string} resourcePath The absolute path of the html file.
       * @return {string} Return cleaned html containing only tags which should be inlined.
       */
      beforePreprocessor: (html, { resourcePath }) => {
        // remove all preload tags, except the Webpack script (/_next/static/chunks/webpack-xxxxx.js), because all assets will be inlined
        html = html.replace(/<link[^>]+rel="preload".+as="(?:font|image|style)".*?>/g, '');
        // remove the unresolved Webpack script (/_next/static/chunks/webpack-xxxxx.js) from body, because the same preloaded script was already inlined in head
        html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*src="\/_next\/static\/chunks\/webpack-.+?".+?<\/script>/, '');
        // remove unless trash code like <script>self.__next_f.push(...)</script>
        html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*self\.__next_f\.push.+?<\/script>/g, '');
        return html;
      },
      // disable default template engine, because we have already rendered HTML
      preprocessor: false,
      loaderOptions: {
        // define the root path for filenames in HTML started with `/`
        root: path.join(__dirname, 'out/'),
      },
    })
  ],

  module: {
    rules: [
      // load CSS files
      {
        test: /\.(css)$/,
        use: ['css-loader'],
      },
      // load resource such as images, fonts as inline data
      {
        test: /\.(png|jpe?g|svg|webp|ico|woff2?)$/i,
        type: 'asset/inline',
      },
    ],
  },

  performance: {
    // disable warning size limit
    hints: false,
  },

}
