/* eslint-disable no-new-func */
import typeCheck from './typeCheck';

// eslint-disable-next-line no-console
console.error = jest.fn();

describe('typeCheck', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should be callable function', () => {
    expect(typeCheck instanceof Function).toBe(true);
  });

  describe('String', () => {
    test.each([
      'Value',
      '123',
      '',
      String(),
      String(123),
      String(null),
      String(false),
    ])('should return true if value is %s', (value) => {
      expect(typeCheck(value, String)).toBe(true);
    });

    test.each([
      -1,
      0,
      1,
      false,
      null,
      NaN,
      undefined,
      [],
      {},
      String,
      Number,
      Boolean,
      Date,
      RegExp,
      Function,
      Number(),
      Boolean(),
      new Date(),
      new RegExp(/A/),
      new Function(''),
      () => {},
    ])('should return false if value is %s', (value) => {
      expect(typeCheck(value, String)).toBe(false);
    });
  });

  describe('Number', () => {
    test.each([
      -1,
      0,
      1,
      NaN,
      Number(),
      Number(123),
      Number(null),
      Number(false),
    ])('should return true if value is %s', (value) => {
      expect(typeCheck(value, Number)).toBe(true);
    });

    test.each([
      'Value',
      '-1',
      '0',
      '1',
      false,
      null,
      undefined,
      [],
      {},
      String,
      Number,
      Boolean,
      Date,
      RegExp,
      Function,
      String(),
      Boolean(),
      new Date(),
      new RegExp(/A/),
      new Function(''),
      () => {},
    ])('should return false if value is %s', (value) => {
      expect(typeCheck(value, Number)).toBe(false);
    });
  });

  describe('Boolean', () => {
    test.each([
      false,
      true,
      Boolean(),
      Boolean(123),
      Boolean(null),
      Boolean(false),
    ])('should return true if value is %s', (value) => {
      expect(typeCheck(value, Boolean)).toBe(true);
    });

    test.each([
      'false',
      'true',
      '',
      0,
      1,
      NaN,
      null,
      undefined,
      [],
      {},
      String,
      Number,
      Boolean,
      Date,
      RegExp,
      Function,
      String(),
      Number(),
      new Date(),
      new RegExp(/A/),
      new Function(''),
      () => {},
    ])('should return false if value is %s', (value) => {
      expect(typeCheck(value, Boolean)).toBe(false);
    });
  });

  describe('Array', () => {
    test.each([
      [[]],
      [[1]],
      Array([]),
      Array([1]),
    ])('should return true if value is %s', (value) => {
      expect(typeCheck(value, Array)).toBe(true);
    });

    test.each([
      '[]',
      '[1]',
      '',
      0,
      1,
      NaN,
      null,
      false,
      undefined,
      {},
      String,
      Number,
      Boolean,
      Date,
      RegExp,
      Function,
      String(),
      Number(),
      new Date(),
      new RegExp(/A/),
      new Function(''),
      () => {},
    ])('should return false if value is %s', (value) => {
      expect(typeCheck(value, Array)).toBe(false);
    });
  });

  describe('Function', () => {
    test.each([
      () => {},
      new Function(''),
      String,
      Number,
      Boolean,
      Date,
      RegExp,
      Function,
    ])('should return true if value is %s', (value) => {
      expect(typeCheck(value, Function)).toBe(true);
    });

    test.each([
      'value',
      '',
      0,
      1,
      NaN,
      null,
      false,
      undefined,
      [],
      {},
      String(),
      Number(),
      new Date(),
      new RegExp(/A/),
    ])('should return false if value is %s', (value) => {
      expect(typeCheck(value, Function)).toBe(false);
    });
  });

  describe('Date', () => {
    test.each([
      new Date(),
      new Date(null),
      new Date(123),
    ])('should return true if value is %s', (value) => {
      expect(typeCheck(value, Date)).toBe(true);
    });

    test.each([
      'value',
      '',
      0,
      1,
      NaN,
      null,
      false,
      undefined,
      [],
      {},
      String,
      Number,
      Boolean,
      Date,
      RegExp,
      Function,
      String(),
      Number(),
      Boolean(),
      new RegExp(/A/),
      new Function(''),
      () => {},
    ])('should return false if value is %s', (value) => {
      expect(typeCheck(value, Date)).toBe(false);
    });
  });

  describe('RegExp', () => {
    test.each([
      /A/,
      new RegExp(/A/),
    ])('should return true if value is %s', (value) => {
      expect(typeCheck(value, RegExp)).toBe(true);
    });

    test.each([
      'value',
      '',
      0,
      1,
      NaN,
      null,
      false,
      undefined,
      [],
      {},
      String,
      Number,
      Boolean,
      Date,
      RegExp,
      Function,
      String(),
      Number(),
      Boolean(),
      new Function(''),
      new Date(),
      () => {},
    ])('should return false if value is %s', (value) => {
      expect(typeCheck(value, RegExp)).toBe(false);
    });
  });

  describe('Regular Expressions', () => {
    test.each([
      'A',
      'AAA',
      /A/,
      new RegExp(/A/),
    ])('should return true if value is %s', (value) => {
      expect(typeCheck(value, /A/)).toBe(true);
    });

    test.each([
      /b/,
      'a',
      'value',
      '',
      0,
      1,
      NaN,
      null,
      false,
      undefined,
      [],
      {},
      String,
      Number,
      Boolean,
      Date,
      RegExp,
      Function,
      String(),
      Number(),
      Boolean(),
      new Function(''),
      new Date(),
      new RegExp(/b/),
      () => {},
    ])('should return false if value is %s', (value) => {
      expect(typeCheck(value, /A/)).toBe(false);
    });
  });

  describe('Typed Arrays', () => {
    test.each([
      [[]],
      [[1]],
      [[1, 2, 3]],
    ])('should return true if value is %s', (value) => {
      expect(typeCheck(value, [Number])).toBe(true);
    });

    test.each([
      'a',
      'value',
      '',
      0,
      1,
      NaN,
      null,
      false,
      undefined,
      ['1'],
      {},
      String,
      Number,
      Boolean,
      Date,
      RegExp,
      Function,
      String(),
      Number(),
      Boolean(),
      new RegExp(/A/),
      new Function(''),
      new Date(),
      () => {},
    ])('should return false if value is %s', (value) => {
      expect(typeCheck(value, [Number])).toBe(false);
    });
  });

  describe('Typed Objects', () => {
    test.each([
      { a: 1 },
    ])('should return true if value is %s', (value) => {
      expect(typeCheck(value, { a: Number })).toBe(true);
    });

    test.each([
      'a',
      'value',
      '',
      0,
      1,
      NaN,
      null,
      false,
      undefined,
      {},
      { b: 1 },
      { a: '1' },
      String,
      Number,
      Boolean,
      Date,
      RegExp,
      Function,
      String(),
      Number(),
      Boolean(),
      new RegExp(/A/),
      new Function(''),
      new Date(),
      () => {},
    ])('should return false if value is %s', (value) => {
      expect(typeCheck(value, { a: Number })).toBe(false);
    });
  });
});
