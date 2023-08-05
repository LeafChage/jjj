import { JJJ } from './jjj';

it("hello world", () => {
  const fn = jest.fn();
  console.log = fn;
  new JJJ({
    program: [
      {
        call: {
          fn: "print",
          args: ["hello world"]
        }
      }
    ]
  }).eval()
  expect(fn.mock.calls[0][0]).toStrictEqual("hello world");
})

it("1 + 2", () => {
  const fn = jest.fn();
  console.log = fn;
  new JJJ({
    program: [
      {
        call: {
          fn: "print",
          args: [
            {
              call: {
                fn: "+",
                args: [1, {
                  call: {
                    fn: "*",
                    args: [2, 2]
                  }
                }]
              }
            }
          ]
        }
      }
    ]
  }).eval()
  expect(fn.mock.calls[0][0]).toStrictEqual(5);
})

it("if 1 == 2 then print true else print false end", () => {
  const fn = jest.fn();
  console.log = fn;
  new JJJ({
    program: [
      {
        if: {
          condition: {
            call: {
              fn: "==",
              args: [1, 2]
            }
          },
          then: {
            call: {
              fn: "print",
              args: ["true"]
            }
          },
          else: {
            call: {
              fn: "print",
              args: ["false"]
            }
          }
        }
      }
    ]
  }).eval()
  expect(fn.mock.calls[0][0]).toStrictEqual("false");
})
