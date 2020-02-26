import CustomType from './Custom';
import assert from '../assert';

/**
 * @param {any[]} types
 * @returns {typeof OrType}
 */
export default function Or(...types) {
  class OrType extends CustomType {
    /**
     * @param {any} value
     */
    parse(value) {
      return assert(value, ...types);
    }
  }

  return OrType;
}
