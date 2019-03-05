const jsonfile = require('jsonfile');

const resolvePath = require('./resolvePath');

module.exports = async function genManifestTemplate() {
  const packageInfo = await jsonfile
    .readFile(
      resolvePath('package.json')
    );

  const manifest = Object.assign(
    {},
    require(
      resolvePath('browser/base/.manifestrc.js')
    )
  );

  manifest.version = packageInfo.version;

  return manifest;
};