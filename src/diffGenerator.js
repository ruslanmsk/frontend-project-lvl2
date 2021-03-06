import _ from 'lodash';

export default function generateDiff(json1, json2) {
  const keys1 = Object.keys(json1);
  const keys2 = Object.keys(json2);
  const allUniqueKeys = [...new Set([...keys1, ...keys2])];

  const result = _.sortBy(allUniqueKeys).map((key) => {
    if (!_.has(json1, key)) {
      return { status: 'added', key, value: json2[key] };
    }

    if (!_.has(json2, key)) {
      return { status: 'deleted', key, value: json1[key] };
    }

    if (_.isObject(json1[key]) && _.isObject(json2[key])) {
      return { status: 'complex', key, children: generateDiff(json1[key], json2[key]) };
    }

    if (json1[key] === json2[key]) {
      return { status: 'unchanged', key, value: json1[key] };
    }

    return {
      status: 'modified', key, oldValue: json1[key], newValue: json2[key],
    };
  });

  return result;
}
