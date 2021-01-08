import genDiff from '../index.js';

describe('сравниваем два json', () => {
  it('подробный случай', () => {
    expect.hasAssertions();
    const result = genDiff(
      `${__dirname}/../__fixtures__/file1.json`,
      `${__dirname}/../__fixtures__/file2.json`,
    );
    expect(result).toStrictEqual(`{
  - timeout: 50
  + timeout: 20
}`);
  });

  it('пустые файлы', () => {
    expect.hasAssertions();
    const result = genDiff(
      `${__dirname}/../__fixtures__/empty.json`,
      `${__dirname}/../__fixtures__/empty.json`,
    );
    expect(result).toStrictEqual(`{
}`);
  });

  it('только добавляем значения', () => {
    expect.hasAssertions();
    const result = genDiff(
      `${__dirname}/../__fixtures__/empty.json`,
      `${__dirname}/../__fixtures__/file1.json`,
    );
    expect(result).toStrictEqual(`{
  + timeout: 50
}`);
  });

  it('только удаляем значения', () => {
    expect.hasAssertions();
    const result = genDiff(
      `${__dirname}/../__fixtures__/file1.json`,
      `${__dirname}/../__fixtures__/empty.json`,
    );
    expect(result).toStrictEqual(`{
  - timeout: 50
}`);
  });

  // Ключи должны быть в алфавитном порядке
  it('сложный кейс, где все', () => {
    expect.hasAssertions();
    const result = genDiff(
      `${__dirname}/../__fixtures__/file3.json`,
      `${__dirname}/../__fixtures__/file4.json`,
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
});

describe('сравниваем два yaml', () => {
  it('подробный случай', () => {
    expect.hasAssertions();
    const result = genDiff(
      `${__dirname}/../__fixtures__/file1.yml`,
      `${__dirname}/../__fixtures__/file2.yml`,
    );
    expect(result).toStrictEqual(`{
  - timeout: 50
  + timeout: 20
}`);
  });

  it('пустые файлы', () => {
    expect.hasAssertions();
    const result = genDiff(
      `${__dirname}/../__fixtures__/empty.yml`,
      `${__dirname}/../__fixtures__/empty.yml`,
    );
    expect(result).toStrictEqual(`{
}`);
  });

  it('только добавляем значения', () => {
    expect.hasAssertions();
    const result = genDiff(
      `${__dirname}/../__fixtures__/empty.yml`,
      `${__dirname}/../__fixtures__/file1.yml`,
    );
    expect(result).toStrictEqual(`{
  + timeout: 50
}`);
  });

  it('только удаляем значения', () => {
    expect.hasAssertions();
    const result = genDiff(
      `${__dirname}/../__fixtures__/file1.yml`,
      `${__dirname}/../__fixtures__/empty.yml`,
    );
    expect(result).toStrictEqual(`{
  - timeout: 50
}`);
  });

  // Ключи должны быть в алфавитном порядке
  it('сложный кейс, где все', () => {
    expect.hasAssertions();
    const result = genDiff(
      `${__dirname}/../__fixtures__/file3.yml`,
      `${__dirname}/../__fixtures__/file4.yml`,
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
});
