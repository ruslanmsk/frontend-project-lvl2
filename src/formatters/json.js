function generate(diff) {
  const result = Object.keys(diff).sort().map((key) => {
    const {
      status, value, oldValue, newValue, children,
    } = diff[key];

    switch (status) {
      case 'unchanged':
        // TODO: убрать
        return null;
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
        throw new Error('not right status diff');
    }
  });

  return result.filter(Boolean);
}

export default function jsonFormatter(diff) {
  const result = generate(diff);
  return JSON.stringify(result);
}
