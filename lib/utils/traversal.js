const { isString, isArray, isObject } = require('./typeCheck');

module.exports = function traversal(obj, cb) {

  if (isObject(obj)) {
    Object.keys(obj)
      .forEach(
        key => {
          obj[key] = traversal(obj[key], cb);
        }
      );
  } else if (isArray(obj)) {
    for (let i = 0, ii = obj.length; i < ii; i++) {
      obj[i] = traversal(obj[i], cb);
    }
  } else if (isString(obj)) {
    const res = cb(obj);

    if (res) {
      obj = res;
    }
  }

  return obj;
};