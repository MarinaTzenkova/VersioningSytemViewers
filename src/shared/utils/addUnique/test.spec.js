import { addUnique } from "../index";

import { expect } from "chai";

describe("utils/addUnique", () => {
  const arr = [1, 2, 3, 4, 5, 6];
  it("should add the item to the array", () => {
    const result = addUnique(arr, 7);
    expect(result).to.deep.equal([1, 2, 3, 4, 5, 6, 7]);
  });
  it("should not add the item to the array since it is already present", () => {
    const result = addUnique(arr, 2);
    expect(result).to.deep.equal([1, 2, 3, 4, 5, 6]);
  });
});
