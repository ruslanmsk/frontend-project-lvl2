#!/usr/bin/env node

const packageJson = require("../package.json");
const { Command } = require("commander");
const program = new Command();

program
  .version(packageJson.version)
  .description("Compares two configuration files and shows a difference.")
  .helpOption("-h, --help", "output usage information");

program.parse(process.argv);
