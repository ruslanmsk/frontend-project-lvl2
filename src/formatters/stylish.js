import isObject from '../utils.js';

export default function stylishFormatter(diff, space = 0, sort = true) {
  const printComplexObj = (value, currentSpace) => {
    const result = Object.keys(value).map((key) => {
      if (isObject(value[key])) {
        return `    ${key}: ${printComplexObj(value[key], currentSpace + 1)}`;
      }
      return `    ${key}: ${value[key]}`;
    }).map((str) => `${' '.repeat(4 * (currentSpace + 1))}${str}`);

    return `{\n${result.join('\n')}\n${' '.repeat(4 * (currentSpace + 1))}}`.trim();
  };

  const generateLine = (key, value, sign = ' ') => {
    if (isObject(value)) {
      return `  ${sign} ${key}: ${printComplexObj(value, space)}`;
    }
    return `  ${sign} ${key}: ${value}`;
  };

  const keys = Object.keys(diff);
  if (sort) {
    keys.sort();
  }

  const result = keys.map((key) => {
    const {
      status, value, oldValue, newValue, children,
    } = diff[key];

    switch (status) {
      case 'unchanged':
        return generateLine(key, value, ' ');
      case 'modified':
        return `${generateLine(key, oldValue, '-')}\n${' '.repeat(4 * space)}${generateLine(key, newValue, '+')}`;
      case 'deleted':
        return generateLine(key, value, '-');
      case 'added':
        return generateLine(key, value, '+');
      case 'complex':
        return `    ${key}: ${stylishFormatter(children, space + 1)}`;
      default:
        throw new Error('not right status diff');
    }
  }).map((str) => `${' '.repeat(4 * space)}${str}`);

  return `{\n${result.join('\n')}\n${' '.repeat(4 * space)}}`.trim();
}
