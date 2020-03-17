/**
 * Quite literally drills through an object's properties
 * @param {Object} object - Object to drill
 * @param {string[]} propsToDrill - List of properties you want to drill into the object
 * @example
 * const object = {
 *  prop1: {
 *    prop2: 23
 *  }
 * }
 * drill(object, ['prop1', 'prop2']) //returns 23
 */
function drill(object, propsToDrill) {
  return propsToDrill.reduce((drilled, prop) => {
    return prop !== "" ? drilled[prop] : drilled;
  }, object);
}

export default drill;
