function format(diff) {
  const result = diff.map((diffItem) => {
    const {
      status, value, oldValue, newValue, children, key,
    } = diffItem;

    switch (status) {
      case 'modified':
        return {
          property: key, status: 'updated', oldValue, newValue,
        };
      case 'deleted':
        return { property: key, status: 'removed' };
      case 'added':
        return { property: key, status: 'added', newValue: value };
      case 'complex':
        return {
          property: key, status: 'updated', children: [...format(children)],
        };
      default:
        return null;
    }
  });

  return result.filter(Boolean);
}

export default (diff) => {
  const result = format(diff);
  return JSON.stringify(result);
};
