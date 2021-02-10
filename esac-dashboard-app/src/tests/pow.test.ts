import { pow } from "../functions/pow";

test("Calculates x^y", () => {
  expect(pow(2, 2)).not.toEqual(4);
  expect(pow(4, 3)).toEqual(64);
  expect(pow(5, 0)).toEqual(1);
});
