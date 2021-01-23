import fs from 'fs';
import path from 'path';
import parseJson from './json.js';
import parseYml from './yml.js';

export default (filepath) => {
  const fileExtension = path.extname(filepath);

  if (fileExtension === '.json') {
    const fileContent = fs.readFileSync(path.resolve(filepath), 'utf-8');
    return parseJson(fileContent);
  }

  if (fileExtension === '.yml') {
    const fileContent = fs.readFileSync(path.resolve(filepath), 'utf-8');
    return parseYml(fileContent);
  }

  throw new Error('Unknown file format');
};
