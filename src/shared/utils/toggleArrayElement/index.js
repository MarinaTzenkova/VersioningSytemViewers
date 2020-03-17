/**
 * If an item is in an array it gets removed, otherwise it gets added
 * @param {Array<any>} arr
 * @param {any} element
 */
function toggleArrayElement(arr, element) {
  const newArr = [...arr];
  const index = newArr.indexOf(element);
  if (index === -1) newArr.push(element);
  else newArr.splice(index, 1);
  return newArr;
}
export default toggleArrayElement;
