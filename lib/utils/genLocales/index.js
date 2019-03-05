const { src, dest } = require('gulp');

module.exports = function genLocales() {
  return src(
      'browser/base/_locales/**/*'
    )
    .pipe(
      dest(
        'dist/_locales'
      )
    );
};