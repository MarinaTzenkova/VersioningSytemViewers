import { formValidators } from "../index";

import { expect } from "chai";

describe("utils/formValidators", () => {
  it("required", () => {
    expect(formValidators.required("")).to.equal("Field can't be empty.");
    expect(formValidators.required("asd")).to.equal(false);
  });
  it("minChar", () => {
    expect(formValidators.minChar("asd", 4)).to.equal(
      "Field must have at least 4 characters."
    );
    expect(formValidators.minChar("asd", 3)).to.equal(false);
  });
  it("maxChar", () => {
    expect(formValidators.maxChar("asd", 2)).to.equal(
      "Field must have no more than 2 characters."
    );
    expect(formValidators.maxChar("asd", 3)).to.equal(false);
  });
  it("isEmail", () => {
    expect(formValidators.isEmail("asd")).to.equal(
      "Field must be a valid email address."
    );
    expect(formValidators.isEmail("asd@gmail.com")).to.equal(false);
    expect(formValidators.isEmail("")).to.equal(false);
  });
  it("validateNewPassword", () => {
    expect(formValidators.validateNewPassword("asd", "abc")).to.equal(
      "Passwords do not match."
    );
    expect(formValidators.validateNewPassword("asd", "asd")).to.equal(false);
  });
});
