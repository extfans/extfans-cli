const getExtName = require('../../getExtName');

module.exports = function filterAssets(assets, type) {
  return assets
    .filter(
      asset => {
        return getExtName(asset) === type;
      }
    );
};