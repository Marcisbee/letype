import check from './check';
import assert from './assert';

jest.mock('./assert.js');

/** @type {jest.Mock<boolean>} */
const mockedAssert = assert;

describe('check', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should be callable function', () => {
    expect(check instanceof Function).toBe(true);
  });

  test('should accept value without types', () => {
    const output = check('value');

    expect(output).toBe(true);
  });

  test('should accept value and type', () => {
    const types = [
      String,
    ];

    const output = check('value', ...types);

    expect(output).toBe(true);
  });

  test('should pass value and type to `assert` function', () => {
    const types = [
      String,
      Number,
    ];

    check('value', ...types);

    expect(mockedAssert).toHaveBeenCalledTimes(1);
    expect(mockedAssert).toHaveBeenCalledWith('value', ...types);
  });

  test('should return `false` if assert function throws', () => {
    mockedAssert.mockImplementation(() => {
      throw new Error();
    });
    const output = check('value');

    expect(output).toBe(false);
  });
});
