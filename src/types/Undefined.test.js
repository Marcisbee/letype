import CustomType from './Custom';
import Undefined from './Undefined';

describe('Undefined', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should extend `CustomType`', () => {
    expect(Undefined.prototype instanceof CustomType).toBe(true);
  });

  test('should return `true` with value ``', () => {
    // @ts-ignore
    const output = new Undefined().parse();

    expect(output).toBe(true);
  });

  test('should return `true` with value `undefined`', () => {
    const output = new Undefined().parse(undefined);

    expect(output).toBe(true);
  });

  test('should return `false` with value "1"', () => {
    const output = new Undefined().parse('1');

    expect(output).toBe(false);
  });

  test('should return `false` with value `0`', () => {
    const output = new Undefined().parse(0);

    expect(output).toBe(false);
  });

  test('should return `false` with value `null`', () => {
    const output = new Undefined().parse(null);

    expect(output).toBe(false);
  });

  test('should return `false` with value `NaN`', () => {
    const output = new Undefined().parse(NaN);

    expect(output).toBe(false);
  });
});
