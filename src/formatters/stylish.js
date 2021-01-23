import isObject from '../utils.js';

function joinComplexItem(result, s) {
  return `{\n${result.join('\n')}\n${' '.repeat(s)}}`;
}

function formatComplexItem(value, currentLevel) {
  const spaceCount = 4 * (currentLevel + 2);
  const result = Object.keys(value)
    .map((key) => (isObject(value[key])
      ? `${' '.repeat(spaceCount)}${key}: ${formatComplexItem(value[key], currentLevel + 1)}`
      : `${' '.repeat(spaceCount)}${key}: ${value[key]}`));

  return joinComplexItem(result, 4 * (currentLevel + 1));
}

function generateLine(key, value, prefix, currentLevel) {
  return isObject(value)
    ? `  ${prefix} ${key}: ${formatComplexItem(value, currentLevel)}`
    : `  ${prefix} ${key}: ${value}`;
}

function format(diff, level = 0) {
  const result = diff.map((diffItem) => {
    const {
      status, value, oldValue, newValue, children, key,
    } = diffItem;

    switch (status) {
      case 'unchanged':
        return generateLine(key, value, ' ', level);
      case 'modified':
        return `${generateLine(key, oldValue, '-', level)}\n${' '.repeat(4 * level)}${generateLine(key, newValue, '+', level)}`;
      case 'deleted':
        return generateLine(key, value, '-', level);
      case 'added':
        return generateLine(key, value, '+', level);
      case 'complex':
        return `${' '.repeat(4)}${key}: ${format(children, level + 1)}`;
      default:
        return null;
    }
  }).filter(Boolean).map((str) => `${' '.repeat(4 * level)}${str}`);

  return joinComplexItem(result, 4 * level);
}

export default (diff) => {
  const result = format(diff);
  return result;
};
