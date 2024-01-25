const webpack = require('webpack')
const path = require('path')
const { EnvironmentPlugin } = require('webpack')

const rootPath = path.resolve(__dirname, './')
const srcPath = path.resolve(__dirname, './src')

module.exports = {
  entry: {
    app: srcPath + '/index.tsx',
  },

  resolve: {
    modules: [srcPath, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
  },

  output: {
    filename: '[name].[hash:8].js',
    path: rootPath + '/dist',
    publicPath: '/',
  },

  optimization: {
    // https://webpack.js.org/plugins/split-chunks-plugin/
    splitChunks: {
      cacheGroups: {
        // Split node_modules into separate file
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  module: {
    rules: [
      { test: /\.ts(x?)$/, exclude: /node_modules/, loader: 'ts-loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [/node_modules/, /build/, /__test__/],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        include: srcPath,
        use: [
          {
            // https://github.com/webpack-contrib/style-loader
            loader: require.resolve('style-loader'),
          },

          {
            // Automatically create TS definition files for CSS modules
            // https://github.com/Megaputer/dts-css-modules-loader
            loader: 'dts-css-modules-loader',
            options: {
              namedExport: true,
              banner: '// This file is generated automatically',
            },
          },
          {
            // Handles CSS. Supports creating CSS modules.
            // https://github.com/webpack-contrib/css-loader
            loader: 'css-loader',
            options: {
              // Create CSS modules
              modules: {
                exportLocalsConvention: 'camelCaseOnly',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer'), require('cssnano')],
              },
            },
          },
          {
            // Transforms scss to css
            // https://github.com/webpack-contrib/sass-loader
            loader: require.resolve('sass-loader'),
          },
          {
            // Makes SASS resources available to all scss files.
            // https://github.com/shakacode/sass-resources-loader
            loader: 'sass-resources-loader',
            options: {
              resources: [srcPath + '/variables.scss', srcPath + '/utils.scss'],
            },
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  plugins: [
    // new EnvironmentPlugin({ ...process.env }),
    new webpack.DefinePlugin({
      process: { env: { ...process.env } },
    }),
  ],
}
