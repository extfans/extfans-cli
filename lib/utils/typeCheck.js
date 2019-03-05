function is(val, type) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

function isString(val) {
  return is(val, 'String');
};

exports.isString = isString;

exports.isObject = function isObject(val) {
  return is(val, 'Object');
};

exports.isArray = function isArray(val) {
  return is(val, 'Array');
};

exports.isSrcPath = function isSrcPath(val) {
  return isString(val) && (val.startsWith('@/') || val.startsWith('~/'));
};