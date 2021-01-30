import _ from 'lodash';

function formatValue(value) {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
}

function format(diff, prefix = '') {
  const result = diff.map((diffItem) => {
    const {
      status, value, oldValue, newValue, children, key,
    } = diffItem;

    switch (status) {
      case 'modified':
        return `Property '${prefix}${key}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
      case 'deleted':
        return `Property '${prefix}${key}' was removed`;
      case 'added':
        return `Property '${prefix}${key}' was added with value: ${formatValue(value)}`;
      case 'complex':
        return format(children, `${prefix}${key}.`);
      default:
        return null;
    }
  });

  return result.filter(Boolean).join('\n');
}

export default (diff) => {
  const result = format(diff);
  return result;
};
