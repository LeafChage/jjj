import { JJJ } from './jjj';

it("for", () => {
  const fn = jest.fn();
  console.log = fn;
  new JJJ({
    program: [
      {
        for: [
          [
            { def: ["i", 0] },
            { call: ["<=", [{ "$": "i" }, 10,]] },
            {
              '<-': ["i", {
                call: ["+", [{ "$": "i" }, 1]]
              }]
            },
          ],
          {
            call: ["print", [{ "$": "i" }]]
          }
        ]
      }
    ]
  }).eval()
  expect(fn.mock.calls[0][0]).toStrictEqual(0);
  expect(fn.mock.calls[1][0]).toStrictEqual(1);
  expect(fn.mock.calls[2][0]).toStrictEqual(2);
  expect(fn.mock.calls[3][0]).toStrictEqual(3);
  expect(fn.mock.calls[4][0]).toStrictEqual(4);
  expect(fn.mock.calls[5][0]).toStrictEqual(5);
  expect(fn.mock.calls[6][0]).toStrictEqual(6);
  expect(fn.mock.calls[7][0]).toStrictEqual(7);
  expect(fn.mock.calls[8][0]).toStrictEqual(8);
  expect(fn.mock.calls[9][0]).toStrictEqual(9);
})
