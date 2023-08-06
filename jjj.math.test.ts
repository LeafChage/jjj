import { JJJ } from './jjj';

it("1 + 2", () => {
  const fn = jest.fn();
  console.log = fn;
  new JJJ({
    program: [
      {
        call: [
          "print",
          [{
            call: [
              "+",
              [1, {
                call: ["*", [2, 2]]
              }]
            ]
          }]
        ]
      }
    ]
  }).eval()
  expect(fn.mock.calls[0][0]).toStrictEqual(5);
})
