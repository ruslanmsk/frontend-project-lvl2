import fs from 'fs';
import path from 'path';
import parseFile from './parsers/index.js';
import getFormatter from './formatters/index.js';
import generateDiff from './diffGenerator.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');
const getFileFormat = (filepath) => path.extname(filepath);

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);

  const file1 = parseFile(fileContent1, getFileFormat(filepath1));
  const file2 = parseFile(fileContent2, getFileFormat(filepath2));

  const diff = generateDiff(file1, file2);

  const formatDiff = getFormatter(formatName);
  const result = formatDiff(diff);
  return result;
}
