import { normalizeNamespace } from "../index";

import { expect } from "chai";

describe("utils/normalizeNamespace", () => {
  function needsNamespace(namespace, value) {
    return namespace + ":" + value;
  }
  const normalized = normalizeNamespace(needsNamespace);

  it("should normalize the namespace parameter by adding a '/' at the end", () => {
    expect(normalized("asd", 2)).to.equal(needsNamespace("asd/", 2));
  });
  it("should normalize an unspecified namespace into an empty string", () => {
    expect(normalized(2)).to.equal(needsNamespace("", 2));
  });
});
