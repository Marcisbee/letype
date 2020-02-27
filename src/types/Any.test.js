import CustomType from './Custom';
import Any from './Any';

describe('Any', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should extend `CustomType`', () => {
    expect(Any.prototype instanceof CustomType).toBe(true);
  });

  test('should return true', () => {
    const output = new Any().parse();

    expect(output).toBe(true);
  });
});
