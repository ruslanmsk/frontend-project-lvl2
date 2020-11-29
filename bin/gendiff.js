#!/usr/bin/env node

const packageJson = require("../package.json");
const { Command } = require("commander");
const program = new Command();

program
  .version(packageJson.version)
  .description("Compares two configuration files and shows a difference.")
  .helpOption("-h, --help", "output usage information")
  .arguments("<filepath1> <filepath2>")
  .option("-f, --format [type]", "output format");

program.parse(process.argv);
