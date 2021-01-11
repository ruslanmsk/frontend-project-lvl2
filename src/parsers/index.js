import path from 'path';
import parseJson from './json.js';
import parseYml from './yml.js';

export default (filepath) => {
  if (path.extname(filepath) === '.json') {
    return parseJson(filepath);
  }

  if (path.extname(filepath) === '.yml') {
    return parseYml(filepath);
  }

  throw new Error('Unknown file format');
};
