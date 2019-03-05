#!/usr/bin/env node

const program = require('commander');

program
  .usage('<browser>')
  .parse(process.argv);

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.DEBUG = true;
process.env.BROWSER = program.args[0];

const dev = require('../lib/dev');

dev();