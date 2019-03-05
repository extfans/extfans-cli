const merge = require('webpack-merge');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const baseWebpackConfig = require('./base');

module.exports = merge(
  baseWebpackConfig,
  {
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new FriendlyErrorsWebpackPlugin()
    ],
    performance: {
      hints: false
    },
    optimization: {
      namedModules: true,
      namedChunks: true
    }
  }
);