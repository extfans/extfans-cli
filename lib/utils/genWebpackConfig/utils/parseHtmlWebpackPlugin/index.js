const changeSuffix = require('./utils/changeSuffix');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const fs = require('fs');

module.exports = function parseHtmlWebpackPlugin({ chunkName, fileName, path }, chunkNames) {
  const minify = process.env.NODE_ENV === 'production';

  const option = {
    filename: `pages/${fileName}.html`,
    excludeChunks: chunkNames
      .filter(
        curChunkName => curChunkName !== chunkName
      )
  };

  const template = changeSuffix(path, 'html');
  if (fs.existsSync(template)) {
    option.template = template;
  }

  if (minify) {
    option.minify = {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    };
  }

  return new HtmlWebpackPlugin(option);
};