import _ from 'lodash';

function joinComplexItems(items, spacesCount) {
  return `{\n${items.join('\n')}\n${' '.repeat(spacesCount)}}`;
}

function formatComplexItem(value, currentLevel) {
  const spacesCount = 4 * (currentLevel + 2);
  const result = Object.keys(value)
    .map((key) => (_.isObject(value[key])
      ? `${' '.repeat(spacesCount)}${key}: ${formatComplexItem(value[key], currentLevel + 1)}`
      : `${' '.repeat(spacesCount)}${key}: ${value[key]}`));

  return joinComplexItems(result, 4 * (currentLevel + 1));
}

function generateLine(key, value, prefix, currentLevel) {
  return _.isObject(value)
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

  return joinComplexItems(result, 4 * level);
}

export default (diff) => {
  const result = format(diff);
  return result;
};
