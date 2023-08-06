import { JJJ } from './jjj';

it("def", () => {
  const fn = jest.fn();
  console.log = fn;
  new JJJ({
    program: [
      { def: ["value", 1], },
      {
        call: [
          "print",
          [{ "$": "value" }]
        ]
      }
    ]
  }).eval()
  expect(fn.mock.calls[0][0]).toStrictEqual(1);
})
