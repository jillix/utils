/**
 *  Utils
 *  Util functions for Mono modules.
 *
 * */
var Utils = module.exports = {};

/**
 *  Find value
 *  Finds a value in parent (object) using the dot notation passed in dotNot.
 *
 *  Example:
 *
 *      Utils.findValue ({
 *          a: {
 *              b: 1
 *          }
 *      }, "a.b") === 1 // true
 * */
Utils.findValue = function (parent, dotNot) {

    if (!dotNot || !dotNot) return undefined;

    var splits = dotNot.split(".")
      , value
      ;

    for (var i = 0; i < splits.length; ++i) {
        value = parent[splits[i]];
        if (value === undefined) return undefined;
        if (typeof value === "object") parent = value;
    }

    return value;
};

/**
 *  Find function
 *  Finds a function in parent (object) using the dot notation passed in dotNot.
 *
 *  Example:
 *
 *      typeof Utils.findFunction ({
 *          a: {
 *              b: function () {}
 *          }
 *      }, "a.b") === "function" // true
 * */
Utils.findFunction = function (parent, dotNot) {

    var func = Utils.findValue (parent, dotNot);

    if (typeof func !== "function") {
        return undefined;
    }

    return func;
};

/**
 *  Converts an object to a flat one
 *
 *  Example
 *
 *      Utils.flattenObject ({
 *          a: {
 *              b: 1
 *          }
 *      }); // { "a.b": 1 }
 *
 * */
Utils.flattenObject = function (obj) {

    var result = {};

    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        if (typeof obj[key] === 'object' && !(obj[key] instanceof Array)) {
            var flat = Utils.flattenObject (obj[key]);
            for (var x in flat) {
                if (!flat.hasOwnProperty(x)) {
                     continue;
                }

                result[key + '.' + x] = flat[x];
            }
        } else {
            result[key] = obj[key];
        }
    }
    return result;
};

/**
 *  Converts a flat object to an unflatten one
 *
 *  Example
 *
 *      Utils.flattenObject ({
 *          "a.b": 1
 *      }); // { a: { b: 1 } }
 *
 * */
Utils.unflattenObject = function (flat) {

    var result = {}
      , parentObj = result
      ;

    var keys = Object.keys(flat);
    for (var i = 0; i < keys.length; ++i) {

        var key = keys[i]
          , subkeys = key.split('.')
          , last = subkeys.pop()
          ;

        for (var ii = 0; ii < subkeys.length; ++ii) {
            var subkey = subkeys[ii];
            parentObj[subkey] = typeof parentObj[subkey] === 'undefined' ? {} : parentObj[subkey];
            parentObj = parentObj[subkey];
        }

        parentObj[last] = flat[key];
        parentObj = result;
    }

    return result;
};

/**
 *  cloneObject
 *
 *  Example
 *
 *      var cloned = Utils.cloneObject ({
 *          "hello": "world"
 *      });
 *
 * */
Utils.cloneObject = function cloneObject(item, deepClone) {
    if (!deepClone) {
        var c = function () {};
        c.prototype = Object(item);
        return new c();
    }

    if (!item) { return item; } // null, undefined values check

    var types = [ Number, String, Boolean ],
        result;

    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach(function(type) {
        if (item instanceof type) {
            result = type( item );
        }
    });

    if (typeof result == "undefined") {
        if (Object.prototype.toString.call( item ) === "[object Array]") {
            result = [];
            item.forEach(function(child, index, array) {
                result[index] = cloneObject( child );
            });
        } else if (typeof item == "object") {
            // testing that this is DOM
            if (item.nodeType && typeof item.cloneNode == "function") {
                var result = item.cloneNode( true );
            } else if (!item.prototype) { // check that this is a literal
                if (item instanceof Date) {
                    result = new Date(item);
                } else {
                    // it is an object literal
                    result = {};
                    for (var i in item) {
                        result[i] = cloneObject( item[i] );
                    }
                }
            } else {
                // depending what you would like here,
                // just keep the reference, or create new object
                if (false && item.constructor) {
                    // would not advice to do that, reason? Read below
                    result = new item.constructor();
                } else {
                    result = item;
                }
            }
        } else {
            result = item;
        }
    }

    return result;
};
