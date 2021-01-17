function generate(diff) {
  const result = [];
  const keys = Object.keys(diff);
  keys.sort();

  for (const key of keys) {
    const {
      status, value, oldValue, newValue, children,
    } = diff[key];

    switch (status) {
      case 'unchanged':
        break;
      case 'modified':
        result.push({
          property: key, status: 'updated', oldValue, newValue,
        });
        break;
      case 'deleted':
        result.push({ property: key, status: 'removed' });
        break;
      case 'added':
        result.push({ property: key, status: 'added', newValue: value });
        break;
      case 'complex':
        const innerResult = generate(children);
        result.push({
          property: key, status: 'updated', children: [...innerResult],
        });
        break;
      default:
        throw new Error('not right status diff');
    }
  }

  return result;
}

export default function jsonFormatter(diff) {
  const result = generate(diff);
  return JSON.stringify(result);
}
