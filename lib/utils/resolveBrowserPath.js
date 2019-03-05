const resolvePath = require('./resolvePath');

module.exports = function resolveBrowserPath(dir) {
  const browser = process.env.BROWSER;
  return resolvePath('browser/' + browser + '/' + dir);
};