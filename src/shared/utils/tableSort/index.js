export default {
  asc: function(arr, column) {
    return arr.sort(function(a, b) {
      if (typeof a[column] === "number") return a[column] - b[column];
      else if (typeof a[column] === "string")
        return a[column].toLowerCase() > b[column].toLowerCase()
          ? 1
          : b[column].toLowerCase() > a[column].toLowerCase()
          ? -1
          : 0;
    });
  },
  desc: function(arr, column) {
    return arr.sort(function(a, b) {
      if (typeof a[column] === "number") return b[column] - a[column];
      else if (typeof a[column] === "string")
        return a[column].toLowerCase() < b[column].toLowerCase()
          ? 1
          : b[column].toLowerCase() < a[column].toLowerCase()
          ? -1
          : 0;
    });
  }
};
