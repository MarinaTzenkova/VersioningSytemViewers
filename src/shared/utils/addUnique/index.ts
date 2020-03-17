/**
 * Adds an item to an array only if the item is not already in the array
 * @param {any[]} array The array to add the item to
 * @param {any} item The item to add in the array
 * @returns {any[]}
 * @example
 * // returns [1, 2, 4, 5]
 * addUnique([1, 2, 4, 5], 1);
 *
 * //returns ['a', 'b', 'd' 'u']
 * addUnique(['a', 'b', 'd'], 'u');
 */
function addUnique(array: any[], item: any) {
  let newArray = [...array];
  if (!newArray.includes(item)) newArray.push(item);
  return newArray;
}

export default addUnique;
