import parseJson from './json.js';
import parseYml from './yml.js';

export default (data, format) => {
  if (format === '.json') {
    return parseJson(data);
  }

  if (format === '.yml') {
    return parseYml(data);
  }

  throw new Error(`Unknown file format ${format}`);
};
