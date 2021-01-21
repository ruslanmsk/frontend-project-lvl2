import parseFile from './src/parsers/index.js';
import getFormatter from './src/formatters/index.js';
import isObject from './src/utils.js';

const getDiff = (json1, json2) => {
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

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  const diff = getDiff(file1, file2);
  const formatDiff = getFormatter(formatName);
  const result = formatDiff(diff);
  return result;
}

// const p = genDiff('./__fixtures__/json/file5.json', './__fixtures__/json/file6.json', 'plain');
// console.log(p)
