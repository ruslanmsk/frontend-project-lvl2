import isObject from '../utils.js';

function styleValue(value) {
  if (isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
}

function generate(diff, prefix = '') {
  const result = diff.sort().map((obj) => {
    const {
      status, value, oldValue, newValue, children, key,
    } = obj;

    switch (status) {
      case 'unchanged':
        return null;
      case 'modified':
        return `Property '${prefix}${key}' was updated. From ${styleValue(oldValue)} to ${styleValue(newValue)}`;
      case 'deleted':
        return `Property '${prefix}${key}' was removed`;
      case 'added':
        return `Property '${prefix}${key}' was added with value: ${styleValue(value)}`;
      case 'complex':
        return generate(children, `${prefix}${key}.`).join('\n');
      default:
        throw new Error('not right status diff');
    }
  });

  return result.filter(Boolean);
}

export default function plainFormatter(diff) {
  const result = generate(diff);
  return result.join('\n');
}
