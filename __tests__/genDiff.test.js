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

    it('сложный кейс, со вложенной структурой', () => {
      expect.hasAssertions();
      const result = genDiff(
        getFixturePath('file5'),
        getFixturePath('file6'),
      );
      expect(result).toStrictEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        fee: 100500
        deep: {
            id: {
                number: 45
            }
        }
    }
}`);
    });

    it('сложный кейс, где все в формате plain', () => {
      expect.hasAssertions();
      const result = genDiff(
        getFixturePath('file5'),
        getFixturePath('file6'),
        'plain',
      );
      expect(result).toStrictEqual(`Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`);
    });
  }

  run('json');
  run('yml');
});
