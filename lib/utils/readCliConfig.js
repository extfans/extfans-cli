const resolvePath = require('./resolvePath');

module.exports = function readCliConfig() {
  return Object
    .assign(
      {
        webpackPoints: []
      },
      require(
        resolvePath('browser/base/.extfansrc.js')
      )
    );
};