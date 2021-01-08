import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseJsonFile = (filepath) => {
  const fileContent = fs.readFileSync(path.resolve(filepath), 'utf-8');
  return JSON.parse(fileContent);
};

const parseYmlFile = (filepath) => {
  const fileContent = fs.readFileSync(path.resolve(filepath), 'utf-8');
  return yaml.load(fileContent) || {};
};

export default (filepath) => {
  if (path.extname(filepath) === '.json') {
    return parseJsonFile(filepath);
  }

  if (path.extname(filepath) === '.yml') {
    return parseYmlFile(filepath);
  }

  throw new Error('Unknown file format');
};
