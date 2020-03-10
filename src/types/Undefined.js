import CustomType from './Custom';

export default class Undefined extends CustomType {
  /**
   * @param {any} value
   */
  parse(value) {
    return typeof value === 'undefined';
  }
}
