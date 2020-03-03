import CustomType from './types/Custom';

/**
 * @param {any} value
 * @param {Function|RegExp|Array|Record<any, any>} type
 * @param {string[]} path
 * @param {boolean} silent
 * @returns {boolean}
 */
export default function typeCheck(value, type, path = [], silent = false) {
  if (typeof type === 'function' && type.constructor instanceof CustomType) {
    const { parse } = type();
    if (typeof parse === 'function') return parse(value);
  }

  const retype = ((typeof type === 'function') ? type() : type);
  /** @type {string} */
  const typed = typeof retype;

  const constructorsMatch = value !== undefined && value !== null && value.constructor === type;

  if (type === Date) {
    return constructorsMatch;
  }

  if (type && type.constructor === RegExp && retype instanceof RegExp) {
    /** @type {boolean} */
    const typeChecked = retype.test(value);
    if (!typeChecked && !silent) {
      console.error(`Type error: Expected ${path.length > 0 ? `\`${path.join('.')}\`` : 'value'} as \`${value}\` to pass regexp \`${retype}\``);
    }
    return typeChecked;
  }

  if (type === RegExp) {
    return constructorsMatch;
  }

  if (constructorsMatch) {
    return true;
  }

  if (typed === 'object' && typeof value === 'object') {
    let valid = true;

    // Uncalled Array function
    if (type && type instanceof Function && type.name === 'Array' && type.constructor instanceof Function) {
      return (value && value.constructor) === (type && type.constructor);
    }

    if (type instanceof Array && type.length === 1) {
      if (!(value && value.length > -1)) {
        return false;
      }

      // eslint-disable-next-line no-restricted-syntax
      for (const item in value) {
        if ({}.hasOwnProperty.call(value, item)) {
          const typeChecked = typeCheck(value[item], type[0], path.concat(item), silent);
          if (valid) {
            valid = typeChecked;
          }
        }
      }
    } else {
      const newValue = { ...type, ...value };
      // eslint-disable-next-line no-restricted-syntax
      for (const item in newValue) {
        if ({}.hasOwnProperty.call(newValue, item)) {
          const typeChecked = typeCheck(newValue[item], type[item], path.concat(item), silent);
          if (valid) {
            valid = typeChecked;
          }
        }
      }
    }

    return valid;
  }

  // eslint-disable-next-line valid-typeof
  const checked = typeof value === typed;

  if (!checked) {
    if (value === undefined) {
      if (!silent) {
        console.error(`Type error: ${path.length > 0 ? `\`${path.join('.')}\`` : 'Value'} is undefined! Required value of type \`${typed}\``);
      }
    } else
    if (retype === undefined) {
      if (!silent) {
        console.error(`Type error: ${path.length > 0 ? `\`${path.join('.')}\`` : 'Value'} is defined as \`${value}\`! But it should not be defined at all!`);
      }
    } else
    if (!silent) {
      console.error(`Type error: \`${value}\` is not of type \`${typed}\`${path.length > 0 ? ` in \`${path.join('.')}\`` : ''}`);
    }
  }

  return checked;
}
