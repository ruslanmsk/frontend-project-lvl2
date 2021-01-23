import formatToPlain from './plain.js';
import formatToStylish from './stylish.js';
import formatToJson from './json.js';

export default function getFormatter(formatName) {
  switch (formatName) {
    case 'stylish':
      return formatToStylish;
    case 'plain':
      return formatToPlain;
    case 'json':
      return formatToJson;
    default:
      throw new Error('Unknown format name');
  }
}
