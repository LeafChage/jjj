export class JJJ {
  private definedFn: Record<string, Fn> = {
    "print": (v: any[]) => console.log(v[0]),
    "+": (v: number[]) => v[0] + v[1],
    "-": (v: number[]) => v[0] - v[1],
    "*": (v: number[]) => v[0] * v[1],
    "/": (v: number[]) => v[0] / v[1],
    "%": (v: number[]) => v[0] % v[1],
    "==": (v: any[]) => v[0] === v[1],
    "!=": (v: any[]) => v[0] !== v[1],
    ">": (v: any[]) => v[0] > v[1],
    "<": (v: any[]) => v[0] < v[1],
    ">=": (v: any[]) => v[0] >= v[1],
    "<=": (v: any[]) => v[0] <= v[1],
  };

  public constructor(
    private readonly program: Program
  ) {
  }

  public eval = () => {
    for (const cmd of this.program.program) {
      this.stmtEval(cmd);
    }
  }

  private stmtEval = (cmd: Stmt): any => {
    if ('call' in cmd) {
      this.callEval(cmd);
    } else if ('if' in cmd) {
      this.ifEval(cmd);
    }
  }

  private callEval = (cmd: Call): any => {
    if (cmd.call.fn in this.definedFn) {
      const fn = this.definedFn[cmd.call.fn];
      const args = cmd.call.args.map(this.expression);
      return fn(args);
    } else {
      throw new Error(`unimplemented fn: ${cmd.call.fn}`)
    }
  }

  private ifEval = (cmd: If): any => {
    const flag = this.expression(cmd.if.condition);
    if (flag) {
      this.stmtEval(cmd.if.then);
    } else {
      this.stmtEval(cmd.if.else);
    }
  }

  private expression = (e: Expression) => {
    if (e === null) { return e; }
    if (typeof e === "string") { return e; }
    if (typeof e === "number") { return e; }
    if (typeof e === "boolean") { return e; }
    if ('call' in e) { return this.callEval(e) }
  }
}

