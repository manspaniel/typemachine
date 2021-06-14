import { defaultTypes as t } from "./ts";

const user = t.Record({
  name: t.String(),
  email: t.String(),
  age: t.Number({ minimum: 0, maximum: 99 }),
});

test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});
