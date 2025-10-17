import { describe, expect, it } from "bun:test";
import { sum, product } from "..";

describe("Testing Sum Module", () => {
  it("Should test sum of positive numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("Should test sum of negative numbers", () => {
    expect(sum(-1, -2)).toBe(-3);
  });

  console.log("Sum Test Done!");
});

describe("Testing Product Module", () => {
  it("Should test product of positive numbers", () => {
    expect(product(5, 4)).toBe(20);
  });

  console.log("Product Test Done!");
});
