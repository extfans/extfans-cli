const { src, dest } = require('gulp');
const resolvePath = require('./resolvePath');

module.exports = function genIcons() {
  return src(
     'browser/base/icons/**/*'
    )
    .pipe(
      dest('dist/icons')
    );
};