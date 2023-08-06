import { JJJ } from './jjj';

it("if 1 == 2 then print true else print false end", () => {
  const fn = jest.fn();
  console.log = fn;
  new JJJ({
    program: [
      {
        if: [
          { call: ["==", [1, 2]] },
          { call: ["print", ["true"]] },
          { call: ["print", ["false"]] },
        ]
      }
    ]
  }).eval()
  expect(fn.mock.calls[0][0]).toStrictEqual("false");
})
