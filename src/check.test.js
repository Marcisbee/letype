import check from './check';
import assert from './assert';

jest.mock('./assert.js');

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

    expect(assert).toHaveBeenCalledTimes(1);
    expect(assert).toHaveBeenCalledWith('value', ...types);
  });

  test('should return `false` if assert function throws', () => {
    assert.mockImplementation(() => {
      throw new Error();
    });
    const output = check('value');

    expect(output).toBe(false);
  });
});
