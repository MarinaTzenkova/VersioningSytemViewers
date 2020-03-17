/**
 * Debounce function
 * <br>{@link https://davidwalsh.name/javascript-debounce-function}
 * @param {Function} func Function to debounce
 * @param {number} wait Time to in miliseconds to use for debouncing
 * @param {Boolean} immediate If true it will execute the function immediately the first time and then debounce
 * @example
 * debounce(function(), 150, false)
 */

function debounce(func: Function, wait: number, immediate: boolean) {
  var timeout: null | number;
  return function() {
    //@ts-ignore
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    window.clearTimeout(timeout as number);
    timeout = window.setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
export default debounce;
