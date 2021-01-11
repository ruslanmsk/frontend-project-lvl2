import plain from './plain.js';
import stylish from './stylish.js';

export default function getFormatter(formatName = 'stylish') {
  switch (formatName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      throw new Error('Unknown format name');
  }
}
