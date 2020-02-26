import CustomType from './types/Custom';

/**
 * @param {any} value
 * @param {any} type
 * @param {string[]} path
 * @param {boolean} silent
 * @returns {any} value
 */
export default function typeCheck(value, type, path = [], silent = false) {
  if (type && type.prototype instanceof CustomType) {
    const { parse } = type();
    if (typeof parse === 'function') return parse(value);
  }

  const retype = ((typeof type === 'function') ? type() : type);
  const typed = typeof retype;

  if (type && type.constructor === RegExp) {
    const typeChecked = retype.test(value);
    if (!typeChecked && !silent) {
      console.error(`Type error: Expected ${path.length > 0 ? `\`${path.join('.')}\`` : 'value'} as \`${value}\` to pass regexp \`${retype}\``);
    }
    return typeChecked;
  }

  if (value && value.constructor === type) {
    return true;
  }

  if (typed === 'object' && typeof value === 'object') {
    let valid = true;

    if (type.length === 1) {
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
          const typeChecked = typeCheck(value[item], type[item], path.concat(item), silent);
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
