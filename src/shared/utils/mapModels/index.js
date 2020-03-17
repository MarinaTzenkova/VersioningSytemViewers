import drill from "../drill";
import normalizeNamespace from "../normalizeNamespace";

/**
 * Function that creates 2-way computed properties as seen [here]{@link https://vuex.vuejs.org/guide/forms.html#two-way-computed-property}
 * <br>The function uses normalizeNamespace as a wrapper so it behaves like the native vuex helpers.
 * <br>Use it for forms where you want to be able to use v-model with vuex store props
 * <br>When using this helper, you need to also create a mutation in the relvant vuex module called setFormProp that has an object of this structure as an argument: {name, value}
 * @param {string} namespace - The vuex module to look for
 * @param {string[]} properties - List of properties to generate computed objects from
 * @returns {Object}
 * @example
 * mapModels('filters', ['description'])
 * //returns
 * {
 *  description: {
 *    get() {
 *      return this.state.filters.description;
 *    },
 *    set(value) {
 *      this.state.commit('filters/setFormProp', {name: 'description', value: value})
 *    }
 *  }
 * }
 */

function mapModels(namespace, properties) {
  const splitToArray = string => String(string).split("/");
  return properties.reduce((computedObject, propertyName) => {
    computedObject[propertyName] = {
      get() {
        return drill(this.$store.state, splitToArray(namespace))[propertyName];
      },
      set(value) {
        return this.$store.commit(namespace + "setFormProp", {
          name: propertyName,
          value
        });
      }
    };
    return computedObject;
  }, {});
}

export default (namespace, properties) =>
  normalizeNamespace(mapModels)(namespace, properties);
