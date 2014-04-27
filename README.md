Utils
=====

Util library for Mono modules.

## Methods

## `findValue (parent, dotNot)`
Finds a value in parent (object) using the dot notation passed in dotNot.

### Arguments
 - `@parent`: object that contains the value that must be found
 - `@dotNot`: string that represents the path in the object to the value

### Example

```js
Utils.findValue ({
    a: {
        b: 1
    }
}, "a.b") // 1
```

## `findFunction (parent, dotNot)`
Finds a function in parent (object) using the dot notation passed in dotNot.

### Arguments
 - `@parent`: object that contains the function that must be found
 - `@dotNot`: string that represents the path in the object to the function

### Example:

```js
typeof Utils.findFunction ({
    a: {
        b: function () {}
    }
}, "a.b") // "function"
```

## `flattenObject (obj)`
Converts an object to a flat one

### Arguments
 - `@obj`: the object that must be converted to a flat one

### Example
```js
Utils.flattenObject ({
    a: {
        b: 1
    }
}) // { "a.b": 1 }
```

## `unflattenObject (flat)`
Converts a flat object to an unflatten one

### Arguments
 - `@flat`: the flatten object that must be converted to an unflatten one

### Example

```js
Utils.flattenObject ({
    "a.b": 1
}); // { a: { b: 1 } }
```

## Changelog

### `v0.1.1`
 - Fixed typo
 - Published the module on NPM

### `v0.1.0`
 - Initial release
