module.exports = function dev() {
  const { series, parallel, watch } = require('gulp');

  const webpack = require('webpack');

  const readCliConfig = require('../utils/readCliConfig');

  const cleanDist = require('../utils/cleanDist');

  const genIcons = require('../utils/genIcons');
  const genLocales = require('../utils/genLocales');

  const genManifestTemplate = require('../utils/genManifestTemplate');
  const genWebpackConfig = require('../utils/genWebpackConfig');

  const genManifest = require('../utils/genManifest');

  const resolvePath = require('../utils/resolvePath');

  global.cliConfig = readCliConfig();

  let manifestTemplate = null;
  let webpackStats = null;

  const devTask = series(
    cleanDist,
    parallel(
      genIcons,
      genLocales,
      series(
        async () => {
          manifestTemplate = await genManifestTemplate();
        },
        cb => {
          let webpackConfig = null;
          try {
            webpackConfig = genWebpackConfig(manifestTemplate);
          } catch(e) {
            cb(e);
            return;
          }

          let compiler = null;
          try {
            compiler = webpack(webpackConfig);
          } catch (e) {
            console.log(e);
            cb(e);
            return;
          }

          let isFirst = true;

          compiler
            .watch(
              {},
              (err, stats) => {
                if (err) {
                  if (isFirst) {
                    isFirst = false;

                    cb(err);
                  }
                  return;
                }

                if (stats.hasErrors()) {
                  return;
                }

                webpackStats = stats.toJson({
                  all: false,
                  entrypoints: true
                });

                if (isFirst) {
                  isFirst = false;

                  cb();
                } else {
                  genManifest(
                    manifestTemplate,
                    webpackStats
                  );
                }
              }
            );
        },
        async () => {
          await genManifest(
            manifestTemplate,
            webpackStats
          );
        }
      ),
    ),
    cb => {
      const baseFolderPath = resolvePath('browser/base');

      watch(
        `${baseFolderPath}/icons/*.png`,
        genIcons
      );

      watch(
        `${baseFolderPath}/_locales/**/*.json`,
        genLocales
      );

      cb();
    }
  );

  devTask();
};