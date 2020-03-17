import { mapModels } from "../index";

import { expect } from "chai";

describe("utils/mapModels", () => {
  const vueInstance = {
    $store: {
      state: {
        filters: {
          name: "asd"
        }
      },
      commit(method, { name, value }) {
        switch (method) {
          case "filters/setFormProp":
            vueInstance.$store.state.filters[name] = value;
            break;

          default:
            return null;
        }
      }
    }
  };
  it("should generate computed values with working get set methods", () => {
    const result = mapModels("filters", ["name"]);

    const getter = result.name.get.bind(vueInstance);
    const setter = result.name.set.bind(vueInstance);

    expect(getter()).to.equal("asd");

    setter("John");

    expect(getter()).to.equal("John");
    expect(vueInstance.$store.state.filters.name).to.equal("John");
  });
});
