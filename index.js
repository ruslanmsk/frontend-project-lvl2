import parseFile from './src/parsers.js';

export default function genDiff(filepath1, filepath2) {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  const result = ['{'];

  for (const [key, value] of Object.entries(file1)) {
    if (key in file2) {
      if (value === file2[key]) {
        result.push(`    ${key}: ${value}`);
      } else {
        result.push(`  - ${key}: ${value}`);
        result.push(`  + ${key}: ${file2[key]}`);
      }
    } else {
      result.push(`  - ${key}: ${value}`);
    }
  }

  for (const [key, value] of Object.entries(file2)) {
    if (!(key in file1)) {
      result.push(`  + ${key}: ${value}`);
    }
  }

  result.push('}');

  return result.join('\n').trim();
}
