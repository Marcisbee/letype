import typeCheck from './typeCheck';

/**
 * @param {any} value
 * @param {any[]} typeList
 * @returns {any} value
 */
export default function assert(value, ...typeList) {
  if (typeList && typeList.length === 1) {
    if (!typeCheck(value, typeList[0])) {
      throw new TypeError('Type checker found some type mismatches!');
    }
  } else
  if (typeList && typeList.length > 1) {
    let valid = false;
    typeList.forEach((type) => !valid && (valid = typeCheck(value, type, [], true)));
    if (!valid) {
      console.error(`Type error: \`${value}\` is not any of types: ${typeList.map(t => `\`${t.name}\``).join(', ')}`);
    }
  }

  return value;
}
