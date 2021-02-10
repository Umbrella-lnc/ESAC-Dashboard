import { fac } from "../functions/fac";

test("Computes the factorial of x", () => {
  expect(fac(1)).toEqual(1);
  expect(fac(3)).toEqual(6);
  expect(fac(10)).toEqual(3628800);
});
