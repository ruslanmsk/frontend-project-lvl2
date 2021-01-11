// TODO: to utils
const isObject = (obj) => typeof obj === 'object' && !Array.isArray(obj) && !!obj;

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
  const result = [];
  const keys = Object.keys(diff);
  keys.sort();

  for (const key of keys) {
    const {
      status, value, oldValue, newValue, children,
    } = diff[key];

    switch (status) {
      case 'unchanged':
        // result.push(generateLine(key, value, ' '));
        break;
      case 'modified':
        result.push(`Property '${prefix}${key}' was updated. From ${styleValue(oldValue)} to ${styleValue(newValue)}`);
        break;
      case 'deleted':
        result.push(`Property '${prefix}${key}' was removed`);
        break;
      case 'added':
        result.push(`Property '${prefix}${key}' was added with value: ${styleValue(value)}`);
        break;
      case 'complex':
        const innerResult = generate(children, `${prefix}${key}.`);
        innerResult.forEach((r) => result.push(r));
        break;
      default:
        throw new Error('not right status diff');
    }
  }

  return result;
}

export default function plainFormatter(diff) {
  const result = generate(diff);
  return result.join('\n');
}
