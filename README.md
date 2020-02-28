# Letype

> Type checker that uses native data types.

Letype is simple and small ([1kB MINIFIED + GZIPPED](https://bundlephobia.com/result?p=letype)) type checker library that can validate any JS data types and structures as well as any custom ones.

## Features
- Uses native JS data types.
- Can validate type structures.
- Supports regex validation as a type.
- Supports custom types.
- Small in size.

## Installation

To install the stable version:

```
npm install --save letype
```

This assumes you are using [npm](https://www.npmjs.com/) as your package manager.

If you're not, you can [access these files on unpkg](https://unpkg.com/letype/dist/) (`letype.min.js` is the file you're probalby after), download them, or point your package manager to them.

### Browser Compatibility

Letype.js currently is compatible with all modern browsers.

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

All available exports from package:
```js
import {
  types,
  check,
  assert,
} from 'letype';

const {
  Any,
  Or,
  Undefined,
  Custom,
} = types;
```

## List of available functions
- [`check()`](check) — TODO.
- [`assert()`](assert) — TODO.

## Usage of functions

#### `check()`
It takes first argument as value that should be checked.
Second argument is type that the value should be checked against.
It returns `boolean` (`true` if valid, `false` if invalid).
```js
check('John Doe', String); // -> true
check(123, String); // -> false
```

#### `assert()`
It does exactly the same thing as `check()` function, but with a little difference.
If validation fails it throws error.
```js
assert('John Doe', String); // -> true
assert(123, String); // -> Throw
```

## List of available types
Types are meant to be used as data types that does custom validation against given value inside `assert()` or `check()` functions.

#### Types from `letype` library:
- [`types.Any`](#typesany) — TODO.
- [`types.Or(...types)`](#typesor) — TODO.
- [`types.Undefined`](#typesundefined) — TODO.
- [`types.Custom`](#typescustom) — TODO.

#### Types from JavaScript language:
- [`String`](#string) — TODO.
- [`Number`](#number) — TODO.
- [`Boolean`](#boolean) — TODO.
- [`Array`](#array) — TODO.
- [`Function`](#function) — TODO.
- [`Date`](#date) — TODO.
- [`RegExp`](#regexp) — TODO.

Types can also be created in structures:

- [Typed Arrays](#typed-arrays) — TODO.
- [Typed Objects](#typed-objects) — TODO.
- [Regular Expressions](#regular-expressions) — TODO.

## Usage of types

#### `types.Any`
```js
check('string', Any); // -> true
check(123, Any);      // -> true
```

#### `types.Or()`
```js
check('string', Or(String, Number)); // -> true
check(123, Or(String, Number));  // -> true
check(true, Or(String, Number)); // -> false
```

#### `types.Undefined`
```js
check('string', Undefined);  // -> false
check(undefined, Undefined); // -> true
```

#### `types.Custom`
Custom type is empty and does no checks against anything. It is meant for creating your own custom types.

To do that just extend `Custom` class and define public `parse` method that has one parameter - "value".
It is value to be checked/validated. `parse` method should return boolean (`true` if valid, `false` if invalid).

For example lets create type that checks if value has first capital letter.
```js
class Capital extends types.Custom {
  parse(value) {
    return value[0] === value[0].toUpperCase();
  }
}
```

To use it simply pass it in any of `assert()` or `check()` functions.

```js
check('John', Capital); // -> true
check('doe', Capital);  // -> false
```

#### `String`
```js
check('123', String); // -> true
check(123, String);   // -> false
```

#### `Number`
```js
check('123', Number); // -> false
check(123, Number);   // -> true
```

#### `Boolean`
```js
check('false', Boolean); // -> false
check(false, Boolean);   // -> true
```

#### `Array`
```js
check('array', Array); // -> false
check([], Array);      // -> true
check([1,2,3], Array); // -> true
```

#### `Function`
```js
check('fn', Function);     // -> false
check(() => {}, Function); // -> true
```

#### `Date`
```js
check('10-12-2020', Date); // -> false
check(new Date('10-12-2020'), Date); // -> true
```

#### `RegExp`
```js
check('A-Z', RegExp); // -> false
check(/A-Z/, RegExp); // -> true
```

#### Typed Arrays
```js
check([], [String]);    // -> false
check([1], [String]);   // -> false
check(['1'], [String]); // -> true
```

#### Typed Objects
```js
check({}, { name: String }); // -> false
check({ name: 1 }, { name: String }); // -> false
check({ name: 'John' }, { name: String }); // -> true
```

#### Regular Expressions
```js
check('a', /A-Z/); // -> false
check('A', /A-Z/); // -> true
```

---

## Motivation

We can get awesome type checking in JS with TS, but that only checks types in compile time.

So I wanted some kind of runtime type checking with types that are already available in JS - not using strings as a types. This feels more JS and more natural.

## License

[MIT](http://opensource.org/licenses/MIT) licenced. Copyright &copy; 2020-present, [Marcis (Marcisbee) Bergmanis](https://twitter.com/marcisbee)
