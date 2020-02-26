import assert from './assert';

/**
 * @param {any} value
 * @param {any[]} typeList
 * @returns {boolean}
 */
export default function check(value, ...typeList) {
  try {
    assert(value, ...typeList);
  } catch (e) {
    return false;
  }

  return true;
}
