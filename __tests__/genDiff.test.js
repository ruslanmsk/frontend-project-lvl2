import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const formats = ['json', 'yml'];

function getFixturePath(filename, format) {
  return path.join(__dirname, '..', '__fixtures__', format, `${filename}.${format}`);
}

function getResultPath(filename) {
  return path.join(__dirname, '..', '__fixtures__', 'diffResult', `${filename}`);
}

describe('сравниваем разницу двух файлов', () => {
  it.each(formats)('многоуровневый файл, разница в формате stylish', (format) => {
    const result = genDiff(
      getFixturePath('before', format),
      getFixturePath('after', format),
    );
    const expectedResult = fs.readFileSync(getResultPath('stylish.txt'), 'utf-8');
    expect(result).toStrictEqual(expectedResult);
  });

  it.each(formats)('многоуровневый файл, разница в формате plain', (format) => {
    const result = genDiff(
      getFixturePath('before', format),
      getFixturePath('after', format),
      'plain',
    );
    const expectedResult = fs.readFileSync(getResultPath('plain.txt'), 'utf-8');

    expect(result).toStrictEqual(expectedResult);
  });

  it.each(formats)('многоуровневый файл, разница в формате json', (format) => {
    const result = genDiff(
      getFixturePath('before', format),
      getFixturePath('after', format),
      'json',
    );
    const expectedResult = fs.readFileSync(getResultPath('json.json'), 'utf-8');
    expect(result).toStrictEqual(JSON.stringify(JSON.parse(expectedResult)));
  });

  it('ошибка при неверном формате', () => {
    expect.hasAssertions();

    expect(() => {
      genDiff(
        getFixturePath('before', 'json'),
        getFixturePath('after', 'json'),
        'js',
      );
    }).toThrow('Unknown format');
  });
});
