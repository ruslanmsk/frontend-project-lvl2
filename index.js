import parseFile from './src/parsers.js';

const isObject = (obj) => typeof obj === 'object' && !Array.isArray(obj) && !!obj;

const getDiff = (json1, json2, formatter = 'stylish') => {
  const keys1 = Object.keys(json1);
  const keys2 = Object.keys(json2);
  const allKeys = [...new Set([...keys1, ...keys2])];
  const result = {};

  for (const key of allKeys) {
    const isFile1Contain = key in json1;
    const isFile2Contain = key in json2;

    if (isFile1Contain) {
      if (isFile2Contain) {
        if (isObject(json1[key]) && isObject(json2[key])) {
          result[key] = { status: 'complex', children: getDiff(json1[key], json2[key]) };
        } else if (json1[key] === json2[key]) {
          result[key] = { status: 'unchanged', value: json1[key] };
        } else {
          result[key] = { status: 'modified', oldValue: json1[key], newValue: json2[key] };
        }
      } else {
        result[key] = { status: 'deleted', value: json1[key] };
      }
    } else {
      result[key] = { status: 'added', value: json2[key] };
    }
  }

  return result;
};

const stylishFormatter = (diff, space = 0, sort = true) => {
  const generateLine = (key, value, sign = ' ', isSort) => {
    if (isObject(value)) {
      return `  ${sign} ${key}: ${stylishFormatter(getDiff(value, value), space + 1, isSort)}`;
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
    const { status, value, oldValue, newValue, children } = diff[key];
    switch (status) {
      case 'unchanged':
        result.push(generateLine(key, value, ' '));
        break;
      case 'modified':
        result.push(generateLine(key, oldValue, '-'));
        result.push(generateLine(key, newValue, '+'));
        break;
      case 'deleted':
        result.push(generateLine(key, value, '-', false));
        break;
      case 'added':
        result.push(generateLine(key, value, '+', false));
        break;
      case 'complex':
        result.push(`    ${key}: ${stylishFormatter(children, space + 1)}`);
        break;
      default:
        throw new Error('not right status diff');
    }
  }

  result = result.map(str => `${' '.repeat(4 * space)}${str}`);

  result.unshift('{');
  result.push(`${' '.repeat(4 * space)}}`);

  return result.join('\n').trim();
};

export default function genDiff(filepath1, filepath2) {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  const diff = getDiff(file1, file2);
  return stylishFormatter(diff);
}