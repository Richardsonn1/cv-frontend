const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.config.js')

module.exports = {
  mode: 'development',

  // Configuration shared by several configs
  entry: common.entry,
  module: common.module,
  resolve: common.resolve,

  // Override filename for dev (avoids path issues)
  output: Object.assign(common.output, { filename: '[name]-[hash:8].js' }),

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  devServer: {
    // https://webpack.js.org/configuration/dev-server/

    // Serve files from dist
    static: './dist',

    // Enable Hot Module Replacement (live reload)
    hot: true,

    // Show errors full screen in the browser
    client: {
      overlay: true,
    },

    port: 3050,

    // Setting host to 0.0.0.0 makes the server public
    host: '0.0.0.0',

    // Serve index.html on 404 (see docs for detail)
    historyApiFallback: true,

    allowedHosts: 'all',
  },

  plugins: [
    ...common.plugins,
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
