const path = require('path');

module.exports = function resolveCliPath(dir) {
  return path.resolve(__dirname, '../../', dir);
};