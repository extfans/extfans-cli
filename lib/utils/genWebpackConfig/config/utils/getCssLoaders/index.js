const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getPostCssPlugins = require('./utils/getPostCssPlugins');

module.exports = function getCssLoader(isLess) {
  const inDevMode = process.env.NODE_ENV === 'development';

  const loaders = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: inDevMode
      }
    }
  ];

  if (isLess) {
    loaders[0].options.importLoaders = 2;

    loaders
      .push(
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: inDevMode,
            plugins: getPostCssPlugins
          }
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: inDevMode
          }
        }
      );
  }

  loaders
    .unshift(
      inDevMode ? {
        loader: 'vue-style-loader',
          options: {
            sourceMap: inDevMode
          }
      } : {
        loader: MiniCssExtractPlugin.loader
      }
    );

  return loaders;
}