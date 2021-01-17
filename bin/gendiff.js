#!/usr/bin/env node

import commander from 'commander';
import getDiff from '../index.js';

const program = new commander.Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const result = getDiff(filepath1, filepath2, options.format);
    console.log(result);
  })
  .option('-f, --format [type]', 'output format', 'stylish');

program.parse(process.argv);
