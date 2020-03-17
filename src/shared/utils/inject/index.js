/**
 * This function merges 2 objects and their properties on the first level.
 * An object on the left side has precedence over the right side. So the left properties would override the right properties.
 * ANy propertie you would want to override needs to be t=of the same type in both of the objects
 * @param  {...any} objects The objects passed as arguments to the function are gathered in the objects array
 * @example
 * const obj1 = {
 *  prop: {
 *    subprop1: 1,
 *    subprop2: 2
 *  }
 * }
 * const obj2 = {
 *  prop: {
 *    subprop1: 0
 *  }
 * }
 *
 * inject(obj2, obj1)
 * // returns
 * {
 *  prop: {
 *    subprop1: 0,
 *    subprop2: 2
 *  }
 * }
 *
 * inject(obj1, obj2)
 * // returns
 * {
 *  prop: {
 *    subprop1: 1,
 *    subprop2: 2
 *  }
 * }
 */
function inject(...objects) {
  return objects.reverse().reduce((root, current) => {
    return Object.keys(current).reduce((a, c) => {
      if (typeof root[c] === typeof current[c]) {
        if (typeof root[c] === "object") {
          if (Array.isArray(a[c])) {
            a[c] = [...current[c], ...root[c]];
          } else {
            a[c] = {
              ...root[c],
              ...current[c]
            };
          }
        } else {
          a[c] = current[c];
        }
      } else if (root[c] === undefined || current[c] === undefined) {
        a[c] = current[c];
      } else {
        throw new TypeError(
          `Types ${typeof root[c]} and ${typeof current[
            c
          ]} do not match on the property ${c}.`
        );
      }

      return a;
    }, root);
  }, {});
}

export default inject;
