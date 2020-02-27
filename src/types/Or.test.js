import CustomType from './Custom';
import Or from './Or';
import assert from '../assert';

jest.mock('../assert.js');

describe('Or', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should be a callable function', () => {
    expect(Or instanceof Function).toBe(true);
  });

  test('should extend `CustomType`', () => {
    expect(Or().prototype instanceof CustomType).toBe(true);
  });

  test('should pass single type to assert function', () => {
    const types = [
      String,
    ];
    const OrType = Or(...types);

    new OrType().parse('value');

    expect(assert).toHaveBeenCalledTimes(1);
    expect(assert).toHaveBeenCalledWith('value', ...types);
  });

  test('should pass multiple types to assert function', () => {
    const types = [
      String,
      Number,
      Boolean,
    ];
    const OrType = Or(...types);

    new OrType().parse('value');

    expect(assert).toHaveBeenCalledTimes(1);
    expect(assert).toHaveBeenCalledWith('value', ...types);
  });
});
