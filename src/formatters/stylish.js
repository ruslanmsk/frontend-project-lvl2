const isObject = (obj) => typeof obj === 'object' && !Array.isArray(obj) && !!obj;

export default function stylishFormatter(diff, space = 0, sort = true) {
  const printComplexObj = (value, currentSpace) => {
    const keys = Object.keys(value);
    // TODO: заменить на конст
    let result = [];

    for (const key of keys) {
      if (isObject(value[key])) {
        result.push(`    ${key}: ${printComplexObj(value[key], currentSpace + 1)}`);
      } else {
        result.push(`    ${key}: ${value[key]}`);
      }
    }

    result = result.map((str) => `${' '.repeat(4 * (currentSpace + 1))}${str}`);
    result.unshift('{');
    result.push(`${' '.repeat(4 * (currentSpace + 1))}}`);

    return result.join('\n').trim();
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

  // TODO: заменить на конст
  let result = [];

  for (const key of keys) {
    const {
      status, value, oldValue, newValue, children,
    } = diff[key];
    switch (status) {
      case 'unchanged':
        result.push(generateLine(key, value, ' '));
        break;
      case 'modified':
        result.push(generateLine(key, oldValue, '-'));
        result.push(generateLine(key, newValue, '+'));
        break;
      case 'deleted':
        result.push(generateLine(key, value, '-'));
        break;
      case 'added':
        result.push(generateLine(key, value, '+'));
        break;
      case 'complex':
        result.push(`    ${key}: ${stylishFormatter(children, space + 1)}`);
        break;
      default:
        throw new Error('not right status diff');
    }
  }

  result = result.map((str) => `${' '.repeat(4 * space)}${str}`);

  result.unshift('{');
  result.push(`${' '.repeat(4 * space)}}`);

  return result.join('\n').trim();
}
