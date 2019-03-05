const getBrowsersList = require('../../../../../getBrowsersList');

module.exports = function getPostCssPlugins() {
  return [
    require('autoprefixer')({
      browsers: getBrowsersList()
    })
  ];
}