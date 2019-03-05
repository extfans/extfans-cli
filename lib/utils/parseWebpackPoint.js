const resolvePath = require('./resolvePath');
const resolveBrowserPath = require('./resolveBrowserPath');

module.exports = function parseWebpackPoint(path) {
  const inBaseFolder = path.startsWith('@');

  // 去掉~/ @/
  path = path.substring(2);
 
  // 去掉后缀
  const suffixStartPos = path.lastIndexOf('.');
  const suffix = path.substring(suffixStartPos + 1);

  path = path.substring(0, suffixStartPos);

  const [folderName, fileName] = path.split('/');

  path = path + '/index.js';

  return {
    chunkName: folderName + fileName[0].toUpperCase() + fileName.substring(1),
    fileName: fileName,
    path: inBaseFolder ? resolvePath('browser/base/src/' + path) : resolveBrowserPath('src/' + path),
    type: suffix
  };
};