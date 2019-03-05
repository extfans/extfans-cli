module.exports = function getExtName(path) {
  const pos = path.lastIndexOf('.');

  return path.substring(pos + 1);
}