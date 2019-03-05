const merge = require('webpack-merge');

const baseWebpackConfig = require('./base');

const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(
  baseWebpackConfig,
  {
    devtool: false,
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              warnings: false
            }
          },
          sourceMap: false,
          parallel: true
        }),
        new OptimizeCSSPlugin({
          cssProcessorPluginOptions: {
            preset: [
              'default',
              {
                normalizeUrl: false
              }
            ]
          }
        })
      ],
      runtimeChunk: {
        name: 'runtime'
      },
      flagIncludedChunks: true,
      occurrenceOrder: true,
      providedExports: true,
      usedExports: true,
      concatenateModules: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'static/css/[id].css'
      })
    ]
  }
);