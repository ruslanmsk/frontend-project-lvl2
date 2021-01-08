import parseFile from './src/parsers.js';

export default function genDiff(filepath1, filepath2) {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  const allKeys = [...new Set([...Object.keys(file1), ...Object.keys(file2)])];
  allKeys.sort();

  const result = ['{'];

  for (const key of allKeys) {
    const isFile1Contain = key in file1;
    const isFile2Contain = key in file2;

    if (isFile1Contain) {
      if (isFile2Contain) {
        if (file1[key] === file2[key]) {
          result.push(`    ${key}: ${file1[key]}`);
        } else {
          result.push(`  - ${key}: ${file1[key]}`);
          result.push(`  + ${key}: ${file2[key]}`);
        }
      } else {
        result.push(`  - ${key}: ${file1[key]}`);
      }
    } else {
      result.push(`  + ${key}: ${file2[key]}`);
    }
  }

  result.push('}');

  return result.join('\n').trim();
}
