const fs = require('fs');

const rm = require('rimraf');

const resolvePath = require('./resolvePath');

const distFolderPath = resolvePath('dist');

module.exports = function cleanDist(cb) {
  rm(
    distFolderPath,
    err => {
      if (err) {
        cb(err);

        return;
      }

      fs.mkdirSync(
        distFolderPath
      );

      cb();
    }
  );
}