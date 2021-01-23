function generate(diff) {
  const result = diff.map((obj) => {
    const {
      status, value, oldValue, newValue, children, key,
    } = obj;

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
          property: key, status: 'updated', children: [...generate(children)],
        };
      default:
        return null;
    }
  });

  return result.filter(Boolean);
}

export default function jsonFormatter(diff) {
  const result = generate(diff);
  return JSON.stringify(result);
}
