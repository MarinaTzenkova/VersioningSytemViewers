import { inject } from "../index";

import { expect } from "chai";

describe("utils/inject", () => {
  it("should merge the 2 objects together", () => {
    const fn1 = () => 3;
    const fn2 = () => "asd";

    const obj1 = {
      prop1: {
        abc: 1,
        asd: 2
      },
      prop2: "asdasd",
      prop3: [1, 2, 3],
      prop4: fn1
    };
    const obj2 = {
      prop1: {
        abc: 4
      },
      prop2: "ert",
      prop3: [5],
      prop4: fn2
    };

    const result = inject(obj2, obj1);
    expect(result).to.deep.equal({
      prop1: {
        abc: 4,
        asd: 2
      },
      prop2: "ert",
      prop3: [5, 1, 2, 3],
      prop4: fn2
    });
  });
  it("should fail since the 'prop' property has different types", () => {
    const obj1 = {
      prop: "asd"
    };
    const obj2 = {
      prop: { asd: "asd" }
    };
    expect(() => inject(obj2, obj1)).to.throw(
      TypeError,
      `Types string and object do not match on the property prop.`
    );
  });
});
