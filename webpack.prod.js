const HtmlWebpackPlugin = require('html-webpack-plugin')

// This plugin removes the contents of a folder before building
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const common = require('./webpack.config.js')

module.exports = {
  mode: 'production',

  // Configuration shared by several configs
  entry: common.entry,
  output: common.output,
  module: common.module,
  resolve: common.resolve,
  optimization: common.optimization,

  plugins: [
    ...common.plugins,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: { removeComments: true }
    })
  ]
}
