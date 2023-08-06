import { JJJ } from './jjj';

it("hello world", () => {
  const fn = jest.fn();
  console.log = fn;
  new JJJ({
    program: [
      {
        call: [
          "print",
          ["hello world"]
        ]
      }
    ]
  }).eval()
  expect(fn.mock.calls[0][0]).toStrictEqual("hello world");
})
