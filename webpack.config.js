const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = (process.env.NODE_ENV === 'production')

module.exports = {
  mode: 'development',
  entry: {
    ds: './ds.sass',
    'ds-utilities': './ds-utilities.sass'
  },
  output: {
    path: path.resolve(__dirname, 'css'),
    filename: '[name].bundle.js'
  },
  devtool: isProduction ? false : 'inline-source-map',
  devServer: {
    contentBase: './css',
    stats: {
      preset: 'minimal',
      assets: true,
      modules: false,
      chunks: false,
      chunkModules: false
    }
  },
  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: !isProduction,
          },
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {}
          }
        }
      ]
    }]
  },
  plugins: [
    // new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    ...isProduction
    ? []
    : [
        new HtmlWebpackPlugin({
          template: 'index.html'
        })
      ]
  ]
};