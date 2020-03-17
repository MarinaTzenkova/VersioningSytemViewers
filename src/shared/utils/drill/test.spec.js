import { drill } from "../index";

import { expect } from "chai";

describe("utils/drill", () => {
  it("should drill into the object properties", () => {
    const object = {
      prop1: {
        prop2: {
          someProp: 23,
          otherProp: "asd"
        }
      }
    };

    const result = drill(object, ["prop1", "prop2", "someProp"]);
    expect(result).to.equal(23);
  });
});
