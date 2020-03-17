import { toggleArrayElement } from "../index";

import { expect } from "chai";

describe("utils/toggleArrayElement", () => {
  const arr = [1, 2, 3];
  it("should return a new array with number 10 toggled in", () => {
    expect(toggleArrayElement(arr, 10)).to.deep.equal([1, 2, 3, 10]);
  });
  it("should return a new array with number 3 toggled out", () => {
    expect(toggleArrayElement(arr, 3)).to.deep.equal([1, 2]);
  });
});
