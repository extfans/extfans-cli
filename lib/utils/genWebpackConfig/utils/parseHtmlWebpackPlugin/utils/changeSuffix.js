module.exports = function changeSuffix(name, suffix) {
  const pointIndex = name.lastIndexOf('.');

  return name.substring(0, pointIndex) + '.' + suffix;
}