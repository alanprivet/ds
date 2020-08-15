const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProduction = (process.env.NODE_ENV === 'production')

module.exports = ({ prod = false } = {}) => {
  return {
    mode: prod ? 'production' : 'development',
    entry: {
      ds: './ds.sass'
    },
    output: {
      path: path.resolve(__dirname, 'css'),
      // filename: '[name].css'
    },
    devtool: prod ? false : 'inline-source-map',
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
    optimization: {
      minimizer: [new TerserJSPlugin({})],
    },
    module: {
      rules: [{
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !prod,
            },
          },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !prod
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !prod,
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
      ...prod
        ? []
        : [
          new HtmlWebpackPlugin({
            template: 'index.html'
          })
        ]
    ]
  }
};