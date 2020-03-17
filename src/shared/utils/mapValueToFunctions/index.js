/**
 * Given a list of functions and a value, returns a list of the function results when called with that value
 * @param {Function[]} functions - List of functions that will be called
 * @param {any} value - Value to use as argument
 * @returns {any[]}
 * @example
 * const double = nr => nr*2;
 * const square = nr => nr*nr;
 *
 * mapValueToFunctions([double, square], 3) //returns [6, 9]
 */
function mapValueToFunctions(functions, value) {
  return functions.map(fn => fn(value));
}
export default mapValueToFunctions;
