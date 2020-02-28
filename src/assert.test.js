import typeCheck from './typeCheck';
import assert from './assert';

jest.mock('./typeCheck.js');

/** @type {jest.Mock<boolean>} */
const mockedTypeCheck = typeCheck;

describe('assert', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should be callable function', () => {
    expect(assert instanceof Function).toBe(true);
  });

  test('should do nothing without any types', () => {
    expect(assert('value')).toBe(true);
  });

  test('should call `typeCheck()` if one type is present', () => {
    mockedTypeCheck.mockReturnValue(true);

    assert('value', String);

    expect(mockedTypeCheck).toHaveBeenCalledTimes(1);
    expect(mockedTypeCheck).toHaveBeenCalledWith('value', String);
  });

  test('should call `typeCheck()` once if multiple types are present, first valid', () => {
    mockedTypeCheck.mockReturnValue(true);

    assert('value', String, Number);

    expect(mockedTypeCheck).toHaveBeenCalledTimes(1);
    expect(mockedTypeCheck).toHaveBeenCalledWith('value', String, [], true);
  });

  test('should call `typeCheck()` once if multiple types are present, second valid', () => {
    mockedTypeCheck
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    assert('value', Number, String);

    expect(mockedTypeCheck).toHaveBeenCalledTimes(2);
    expect(mockedTypeCheck).toHaveBeenCalledWith('value', Number, [], true);
    expect(mockedTypeCheck).toHaveBeenCalledWith('value', String, [], true);
  });

  test('should throw if single type check fails', () => {
    mockedTypeCheck.mockReturnValue(false);

    expect(() => assert('value', Number)).toThrow();
  });

  test('should throw if all type check fails', () => {
    mockedTypeCheck
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);

    expect(() => assert('value', String, Boolean)).toThrow();
  });
});
