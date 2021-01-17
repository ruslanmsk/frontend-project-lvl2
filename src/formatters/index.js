import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

export default function getFormatter(formatName = 'stylish') {
  switch (formatName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error('Unknown format name');
  }
}
