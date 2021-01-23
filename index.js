import _ from 'lodash';
import parseFile from './src/parsers/index.js';
import getFormatter from './src/formatters/index.js';
import isObject from './src/utils.js';

const getDiff = (json1, json2) => {
  const keys1 = Object.keys(json1);
  const keys2 = Object.keys(json2);
  const allUniqueKeys = [...new Set([...keys1, ...keys2])];

  const result = _.sortBy(allUniqueKeys).map((key) => {
    const isFile1Contain = key in json1;
    const isFile2Contain = key in json2;

    if (isFile1Contain) {
      if (isFile2Contain) {
        if (isObject(json1[key]) && isObject(json2[key])) {
          return { status: 'complex', key, children: getDiff(json1[key], json2[key]) };
        }
        if (json1[key] === json2[key]) {
          return { status: 'unchanged', key, value: json1[key] };
        }
        return {
          status: 'modified', key, oldValue: json1[key], newValue: json2[key],
        };
      }
      return { status: 'deleted', key, value: json1[key] };
    }
    return { status: 'added', key, value: json2[key] };
  });

  return result;
};

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const fileContent1 = parseFile(filepath1);
  const fileContent2 = parseFile(filepath2);
  const diff = getDiff(fileContent1, fileContent2);

  const formatDiff = getFormatter(formatName);
  const result = formatDiff(diff);
  return result;
}
