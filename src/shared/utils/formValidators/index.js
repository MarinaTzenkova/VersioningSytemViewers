/**
 * @module forms/FormValidators
 * @description Functions that validate form inputs.
 * <br>All of them must take the input as the first parameter.
 * <br> All functions return false if the input is valid and an error message as a string if the input is not valid.
 */
export default {
  /**
   * Validates if an input is empty
   * @param {string} input - Input to validate
   * @param {boolean} boolOnly - If set to true, returns if value is valid or not instead of a message
   * @returns {boolean | string}
   */
  required: function required(input, boolOnly = false) {
    const message = "Field can't be empty.";

    // If falsy value
    if (!input) {
      return boolOnly ? false : message;
    }

    // If empty (works for objects, arrays, etc.)
    if (Object.keys(input).length <= 0) {
      return boolOnly ? false : message;
    }

    return boolOnly ? true : false;
  },
  /**
   * Validates if an input has minimum characters
   * @param {string} input - Input to validate
   * @param {number} min - Minimum number of characters
   * @returns {boolean | string}
   */
  minChar: function minChar(input, min) {
    min = Number(min);
    if (input.length < min)
      return `Field must have at least ${min} characters.`;
    else return false;
  },
  /**
   * Validates if an input has maximum characters
   * @param {string} input - Input to validate
   * @param {number} max - Maximum number of characters
   * @returns {boolean | string}
   */
  maxChar: function maxChar(input, max) {
    max = Number(max);
    if (input.length > max)
      return `Field must have no more than ${max} characters.`;
    else return false;
  },
  /**
   * Validates if an input has maximum characters
   * @param {string} input - Input to validate
   * @param {boolean} boolOnly - If set to true, returns if value is valid or not instead of a message
   * @returns {boolean | string}
   */
  isEmail: function(input, boolOnly = false) {
    const message = "Field must be a valid email address.";
    if (!input) return false;
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!reg.test(input)) {
      return boolOnly ? false : message;
    } else {
      return boolOnly ? true : false;
    }
  },
  validateNewPassword: function(input, confirmInput) {
    if (input !== confirmInput) return `Passwords do not match.`;
    else return false;
  }
};
