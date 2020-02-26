# Letype
Letype is simple type checker library that can validate any JS data types and structures.

## Installation

To install the stable version:

```
npm install --save letype
```

This assumes you are using [npm](https://www.npmjs.com/) as your package manager.

If you're not, you can [access these files on unpkg](https://unpkg.com/letype/dist/), download them, or point your package manager to them.

#### Browser Compatibility

Letype.js currently is compatible with browsers that support at least ES3.

## Example usage

```js
import { types, check } from 'letype';

check(1, Number); // -> true
check('1', Number); // -> false
// "Type error: `1` is not of type `number`"
check({ counter: 1 }, { counter: Number }); // -> true
check({
  id: 1,
  name: 92942,
  age: '21',
  work: null,
  anythingGoes: 'flamingo',
  date: new Date(),
  regexp: 123,
}, {
  id: Number,
  name: String,
  age: Number,
  role: String,
  anythingGoes: types.Any,
  date: Date,
  regexp: /123/,
}); // -> false
// "Type error: `92942` is not of type `string` in `name`"
// "Type error: `21` is not of type `number` in `age`"
// "Type error: `role` is undefined! Required value of type `string`"
// "Type error: `work` is defined as `null`! But it should not be defined at all!"
```

### Currently available types:

- `types.Custom`
Allows to create custom types.
```js
class Any extends types.Custom {
  parse(value) {
    return true;
  }
}
```

- `types.Any`

- `types.Or`
(e.g. `Or(String, Number)`)

## Stay In Touch

- [Twitter](https://twitter.com/marcisbee)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, Marcis (Marcisbee) Bergmanis
