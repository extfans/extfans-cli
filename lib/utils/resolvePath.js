const path = require('path');

const projectRoot = process.cwd();

module.exports = function resolvePath(dir) {
  return path.resolve(projectRoot, dir);
};