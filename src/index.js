import fs from 'fs';
import path from 'path';
import parseFile from './parsers/index.js';
import getFormatter from './formatters/index.js';
import generateDiff from './diffGenerator.js';

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const fileContent1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const fileContent2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

  const file1 = parseFile(fileContent1, path.extname(filepath1));
  const file2 = parseFile(fileContent2, path.extname(filepath2));

  const diff = generateDiff(file1, file2);

  const formatDiff = getFormatter(formatName);
  const result = formatDiff(diff);
  return result;
}
