import path from 'path';
import genDiff from '../index.js';

const formats = ['json', 'yml'];

function getFixturePath(filename, format) {
  return path.join(__dirname, '..', '__fixtures__', format, `${filename}.${format}`);
}

describe('сравниваем разницу двух файлов', () => {
  it.each(formats)('изменение одного свойства', (format) => {
    const result = genDiff(
      getFixturePath('file1', format),
      getFixturePath('file2', format),
    );
    expect(result).toStrictEqual(`{
  - timeout: 50
  + timeout: 20
}`);
  });

  it.each(formats)('оба файла пустые', (format) => {
    const result = genDiff(
      getFixturePath('empty', format),
      getFixturePath('empty', format),
    );
    expect(result).toStrictEqual(`{
}`);
  });

  it.each(formats)('добавляем простое значение', (format) => {
    const result = genDiff(
      getFixturePath('empty', format),
      getFixturePath('file1', format),
    );
    expect(result).toStrictEqual(`{
  + timeout: 50
}`);
  });

  it.each(formats)('удаляем простое значение', (format) => {
    const result = genDiff(
      getFixturePath('file1', format),
      getFixturePath('empty', format),
    );
    expect(result).toStrictEqual(`{
  - timeout: 50
}`);
  });

  it.each(formats)('плоский файл с удалением, добавлением, изменением', (format) => {
    const result = genDiff(
      getFixturePath('file3', format),
      getFixturePath('file4', format),
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

  it.each(formats)('многоуровневый файл', (format) => {
    const result = genDiff(
      getFixturePath('file5', format),
      getFixturePath('file6', format),
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

  it.each(formats)('многоуровневый файл, разница в формате plain', (format) => {
    const result = genDiff(
      getFixturePath('file5', format),
      getFixturePath('file6', format),
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

  it.each(formats)('многоуровневый файл, разница в формате json', (format) => {
    const result = genDiff(
      getFixturePath('file5', format),
      getFixturePath('file6', format),
      'json',
    );
    expect(result).toStrictEqual(JSON.stringify([
      {
        property: 'common',
        status: 'updated',
        children: [
          { property: 'follow', status: 'added', newValue: false },
          { property: 'setting2', status: 'removed' },
          {
            property: 'setting3', status: 'updated', oldValue: true, newValue: null,
          },
          { property: 'setting4', status: 'added', newValue: 'blah blah' },
          {
            property: 'setting5',
            status: 'added',
            newValue: {
              key5: 'value5',
            },
          },
          {
            property: 'setting6',
            status: 'updated',
            children: [
              {
                property: 'doge',
                status: 'updated',
                children: [
                  {
                    property: 'wow', status: 'updated', oldValue: '', newValue: 'so much',
                  },
                ],
              },
              { property: 'ops', status: 'added', newValue: 'vops' },
            ],
          },
        ],
      },

      {
        property: 'group1',
        status: 'updated',
        children: [
          {
            property: 'baz', status: 'updated', oldValue: 'bas', newValue: 'bars',
          },
          {
            property: 'nest',
            status: 'updated',
            oldValue: {
              key: 'value',
            },
            newValue: 'str',
          },
        ],
      },
      { property: 'group2', status: 'removed' },
      {
        property: 'group3',
        status: 'added',
        newValue: {
          fee: 100500,
          deep: {
            id: {
              number: 45,
            },
          },
        },
      },
    ]));
  });
});
