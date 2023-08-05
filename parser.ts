import { z } from 'zod';

const lazyCall: z.ZodType<Call> = z.lazy(() => call);
const lazyStmt: z.ZodType<Stmt> = z.lazy(() => stmt);

const primitive = z.union([
  z.string(),
  z.boolean(),
  z.number(),
  z.null(),
]);

const expression = z.union([
  primitive,
  lazyCall,
])
const call = z.object({
  call: z.object({
    fn: z.string(),
    args: expression.array()
  })
});

const ifstmt = z.object({
  if: z.object({
    condition: expression,
    then: lazyStmt,
    else: lazyStmt,
  })
})

export const stmt = z.union([call, ifstmt]);

export const program = z.object({
  program: stmt.array()
});

declare global {
  type Primitive = z.infer<typeof primitive>
  type Expression = z.infer<typeof expression>
  type Call = {
    call: {
      fn: string,
      args: Expression[]
    }
  };
  type If = {
    if: {
      condition: Expression,
      then: Stmt
      else: Stmt
    }
  };
  type Stmt = Call | If
  type Program = z.infer<typeof program>
}

