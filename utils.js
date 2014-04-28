/**
 *  Utils
 *  Util functions for Mono modules.
 *
 * */
var Utils = module.exports = {

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
    findValue: function (parent, dotNot) {

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
    }

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
  , findFunction: function (parent, dotNot) {

        var func = Utils.findValue (parent, dotNot);

        if (typeof func !== "function") {
            return undefined;
        }

        return func;
    }

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
  , flattenObject: function (obj) {

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
    }

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
  , unflattenObject: function (flat) {

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
    }
}

