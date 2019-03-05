#!/usr/bin/env node

const program = require('commander');

program
  .usage('<browser>')
  .parse(process.argv);

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.DEBUG = false;
process.env.BROWSER = program.args[0];

const build = require('../lib/build');

build();