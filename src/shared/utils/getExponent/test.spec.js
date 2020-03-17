import { getExponent } from "../index";

import { expect } from "chai";

describe("utils/getExponent", () => {
  it("should get a superscripted version of the number 2", () => {
    expect(getExponent(2)).to.equal("²");
  });
  it("should get a non superscripted version of the number 100", () => {
    expect(getExponent(100)).to.equal("^100");
  });
});
