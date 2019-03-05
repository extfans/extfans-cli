const parseWebpackPoints = require('./utils/parseWebpackPoints');
const parseHtmlWebpackPlugin = require('./utils/parseHtmlWebpackPlugin');

module.exports = function genWebpackConfig(manifestTemplate) {
  const tempPoints = parseWebpackPoints(manifestTemplate);

  const entry = {};

  const htmlPlugins = [];

  tempPoints
    .forEach(
      ({ chunkName, path }) => {
        entry[chunkName] = path;
      }
    );

  const chunkNames = Object.keys(entry);

  tempPoints
    .forEach(
      tempPoint => {
        if (tempPoint.type === 'html') {
          htmlPlugins.push(
            parseHtmlWebpackPlugin(
              tempPoint,
              chunkNames
            )
          );
        }
      }
    );

  const config = require(
    process.env.NODE_ENV === 'development' ? './config/dev' : './config/prod'
  );

  config.entry = entry;

  config.plugins = config.plugins
    .concat(htmlPlugins);

  return config;
};