import path from 'path';
import genDiff from '../index.js';

let fileFormat = 'json';

function getFixturePath(filename) {
  return path.join(__dirname, '..', '__fixtures__', fileFormat, `${filename}.${fileFormat}`);
}

describe('сравниваем два файла', () => {
  function run(format) {
    fileFormat = format;

    it('подробный случай', () => {
      expect.hasAssertions();
      const result = genDiff(
        getFixturePath('file1', fileFormat),
        getFixturePath('file2', fileFormat),
      );
      expect(result).toStrictEqual(`{
  - timeout: 50
  + timeout: 20
}`);
    });

    it('пустые файлы', () => {
      expect.hasAssertions();
      const result = genDiff(
        getFixturePath('empty', fileFormat),
        getFixturePath('empty', fileFormat),
      );
      expect(result).toStrictEqual(`{
}`);
    });

    it('только добавляем значения', () => {
      expect.hasAssertions();
      const result = genDiff(
        getFixturePath('empty'),
        getFixturePath('file1'),
      );
      expect(result).toStrictEqual(`{
  + timeout: 50
}`);
    });

    it('только удаляем значения', () => {
      expect.hasAssertions();
      const result = genDiff(
        getFixturePath('file1'),
        getFixturePath('empty'),
      );
      expect(result).toStrictEqual(`{
  - timeout: 50
}`);
    });

    it('сложный кейс, где все', () => {
      expect.hasAssertions();
      const result = genDiff(
        getFixturePath('file3'),
        getFixturePath('file4'),
      );
      expect(result).toStrictEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
    });
  }

  run('json');
  run('yml');
});
