import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default function parse(filepath) {
  const fileContent = fs.readFileSync(path.resolve(filepath), 'utf-8');
  return yaml.load(fileContent) || {};
}
