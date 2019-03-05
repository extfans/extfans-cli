const jsonfile = require('jsonfile');

const resolvePath = require('../resolvePath');
const { isSrcPath } = require('../typeCheck');
const traversal = require('../traversal');
const parseWebpackPoint = require('../parseWebpackPoint');
const filterAssets = require('./utils/filterAssets');

const manifestPath = resolvePath('dist/manifest.json');

module.exports = async function genManifest(manifestTemplate, webpackStats) {
  const manifest = JSON.parse(
    JSON.stringify(manifestTemplate)
  );

  const { entrypoints } = webpackStats;

  traversal(
    manifest,
    str => {
      if (isSrcPath(str)) {
        const { chunkName, fileName, type } = parseWebpackPoint(str);

        const { assets } = entrypoints[chunkName];

        return type === 'html' ? `pages/${fileName}.html` : filterAssets(assets, type);
      }
    }
  );

  await jsonfile
    .writeFile(
      manifestPath,
      manifest,
      {
        spaces: process.env.NODE_ENV === 'production' ? 0 : 2
      }
    );
};