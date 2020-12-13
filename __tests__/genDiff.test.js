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
});
