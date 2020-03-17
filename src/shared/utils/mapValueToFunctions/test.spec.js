import { mapValueToFunctions } from "../index";

import { expect } from "chai";

describe("utils/mapValueToFunctions", () => {
  it("should apply all the functions to the value and return a list of the results", () => {
    const double = n => n * 2;
    const power2 = n => n ** 2;

    const result = mapValueToFunctions([double, power2], 3);

    expect(result).to.deep.equal([6, 9]);
  });
});
