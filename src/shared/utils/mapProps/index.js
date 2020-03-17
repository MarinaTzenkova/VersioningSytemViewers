function mapProps(properties) {
  return properties.reduce((computedObject, propertyName) => {
    computedObject[propertyName] = {
      get() {
        return this.propertyName;
      },
      set(value) {
        return (propertyName = value);
      }
    };
    return computedObject;
  }, {});
}

export default mapProps;
