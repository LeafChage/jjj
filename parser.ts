import { z } from 'zod';

const lazyCall: z.ZodType<Call> = z.lazy(() => call);
const lazyStmt: z.ZodType<Stmt> = z.lazy(() => stmt);

const primitive = z.union([
  z.string(),
  z.boolean(),
  z.number(),
  z.null(),
]);
const ref = z.object({
  '$': z.string()
});

const expression = z.union([
  primitive,
  lazyCall,
  ref,
])
const call = z.object({
  call: z.tuple([
    z.string(),
    expression.array()
  ])
});
const def = z.object({
  def: z.tuple([
    z.string(),
    expression
  ])
});
const assign = z.object({
  '<-': z.tuple([z.string(), expression])
});
const ifstmt = z.object({
  if: z.tuple([
    expression,
    lazyStmt.or(lazyStmt.array()),
    lazyStmt.or(lazyStmt.array()),
  ])
})
const forstmt = z.object({
  for: z.tuple([
    z.tuple([
      lazyStmt,
      expression,
      lazyStmt,
    ]),
    lazyStmt.or(lazyStmt.array()),
  ])
})

export const stmt = z.union([
  call,
  def,
  ifstmt,
  forstmt,
  assign,
]);

export const program = z.object({
  program: stmt.array()
});

declare global {
  type Primitive = z.infer<typeof primitive>
  type Expression = z.infer<typeof expression>
  type Def = z.infer<typeof def>;
  type Call = {
    call: [string, Expression[]]
  };
  type If = {
    if: [
      Expression,
      Stmt | Stmt[],
      Stmt | Stmt[],
    ]
  };
  type For = {
    for: [
      [Stmt, Expression, Stmt],
      Stmt | Stmt[]
    ]
  };
  type Assign = z.infer<typeof assign>;
  type Stmt = Call | If | For | Def | Assign;
  type Program = z.infer<typeof program>
}

