import { JJJ } from './jjj';

it("fizzbuzz", () => {
  const fn = jest.fn();
  console.log = fn;
  new JJJ({
    program: [
      {
        for: [
          [
            { def: ["i", 1] },
            { call: ["<=", [{ "$": "i" }, 20,]] },
            { '<-': ["i", { call: ["+", [{ "$": "i" }, 1]] }] },
          ],
          [
            {
              if: [
                {
                  call: ["&&", [
                    { call: ["==", [{ call: ["%", [{ "$": "i" }, 3]] }, 0]] },
                    { call: ["==", [{ call: ["%", [{ "$": "i" }, 5]] }, 0]] },
                  ]]
                },
                { call: ["print", ["fizzbuzz"]] },
                {
                  if: [
                    { call: ["==", [{ call: ["%", [{ "$": "i" }, 3]] }, 0]] },
                    { call: ["print", ["fizz"]] },
                    {
                      if: [
                        { call: ["==", [{ call: ["%", [{ "$": "i" }, 5]] }, 0]] },
                        { call: ["print", ["buzz"]] },
                        { call: ["print", [{ "$": "i" }]] },
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        ]
      }
    ]
  }).eval()
  expect(fn.mock.calls[0][0]).toStrictEqual(1);
  expect(fn.mock.calls[1][0]).toStrictEqual(2);
  expect(fn.mock.calls[2][0]).toStrictEqual("fizz");
  expect(fn.mock.calls[3][0]).toStrictEqual(4);
  expect(fn.mock.calls[4][0]).toStrictEqual("buzz");
  expect(fn.mock.calls[5][0]).toStrictEqual("fizz");
  expect(fn.mock.calls[6][0]).toStrictEqual(7);
  expect(fn.mock.calls[7][0]).toStrictEqual(8);
  expect(fn.mock.calls[8][0]).toStrictEqual("fizz");
  expect(fn.mock.calls[9][0]).toStrictEqual("buzz");
  expect(fn.mock.calls[10][0]).toStrictEqual(11);
  expect(fn.mock.calls[11][0]).toStrictEqual("fizz");
  expect(fn.mock.calls[12][0]).toStrictEqual(13);
  expect(fn.mock.calls[13][0]).toStrictEqual(14);
  expect(fn.mock.calls[14][0]).toStrictEqual("fizzbuzz");
  expect(fn.mock.calls[15][0]).toStrictEqual(16);
  expect(fn.mock.calls[16][0]).toStrictEqual(17);
  expect(fn.mock.calls[17][0]).toStrictEqual("fizz");
  expect(fn.mock.calls[18][0]).toStrictEqual(19);
  expect(fn.mock.calls[19][0]).toStrictEqual("buzz");
})
