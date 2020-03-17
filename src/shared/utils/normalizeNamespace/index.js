/**
 * Normalizes vuex namespace string.
 * More info [here]{@link https://vuex.vuejs.org/guide/modules.html#binding-helpers-with-namespace}
 * @param {function} fn - Function for which to normalize the namespace
 * @returns {function(string, string[]): function}
 */
function normalizeNamespace(fn) {
  /**
   * @param {string} namespace
   * @param {string[]} map
   */
  return function(namespace, map) {
    if (typeof namespace !== "string") {
      map = namespace;
      namespace = "";
    } else if (namespace.charAt(namespace.length - 1) !== "/") {
      namespace += "/";
    }
    return fn(namespace, map);
  };
}

export default normalizeNamespace;
