#!/usr/bin/env node

const packageInfo = require('../package.json');

const program = require('commander');

program
  .version(packageInfo.version)
  .command('dev <browser>', 'dev extension')
  .command('build <browser>', 'build extension')
  .parse(process.argv);