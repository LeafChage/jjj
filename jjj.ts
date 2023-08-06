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
    "&&": (v: any[]) => v[0] && v[1],
    "||": (v: any[]) => v[0] || v[1],
  };

  private definedV: Map<string, any> = new Map();

  public constructor(
    private readonly program: Program
  ) {
  }

  public eval = () => {
    for (const cmd of this.program.program) {
      this.stmtEval(cmd);
    }
  }

  private stmtEval = (cmd: Stmt) => {
    if ('call' in cmd) {
      this.callEval(cmd);
    } else if ('if' in cmd) {
      this.ifEval(cmd);
    } else if ('def' in cmd) {
      this.defEval(cmd);
    } else if ('for' in cmd) {
      this.forEval(cmd);
    } else if ('<-' in cmd) {
      this.assignEval(cmd);
    }
  }

  private callEval = (cmd: Call): any => {
    const [fnName, args] = cmd.call;
    if (fnName in this.definedFn) {
      const fn = this.definedFn[fnName];
      return fn(args.map(this.expression));
    } else {
      throw new Error(`unimplemented fn: ${fnName}`)
    }
  }

  private ifEval = (cmd: If) => {
    const [condition, trueAction, falseAction] = cmd.if;
    const flag = this.expression(condition);
    if (flag) {
      if (Array.isArray(trueAction)) {
        trueAction.forEach(act => { this.stmtEval(act); })
      } else {
        this.stmtEval(trueAction);
      }
    } else {
      if (Array.isArray(falseAction)) {
        falseAction.forEach(act => { this.stmtEval(act); })
      } else {
        this.stmtEval(falseAction);
      }
    }
  }

  private forEval = (cmd: For): any => {
    const [[init, condition, action], stmt] = cmd.for;
    this.stmtEval(init);
    while (this.expression(condition)) {
      if (Array.isArray(stmt)) {
        stmt.forEach(v => { this.stmtEval(v); })
      } else {
        this.stmtEval(stmt);
      }
      this.stmtEval(action);
    }
  }

  private defEval = (cmd: Def) => {
    const [name, value] = cmd.def;
    this.definedV.set(name, value);
  }

  private assignEval = (cmd: Assign) => {
    const [name, value] = cmd['<-'];
    if (this.definedV.has(name)) {
      return this.definedV.set(name, this.expression(value));
    } else {
      throw new Error(`unimplemented variable: ${name}`)
    }
  }

  private expression = (e: Expression) => {
    if (e === null) { return e; }
    if (typeof e === "string") { return e; }
    if (typeof e === "number") { return e; }
    if (typeof e === "boolean") { return e; }
    if ('call' in e) { return this.callEval(e) }
    if ('$' in e) {
      const name = e.$;
      if (this.definedV.has(name)) {
        return this.definedV.get(name);
      } else {
        throw new Error(`unimplemented variable: ${name}`)
      }
    }
  }
}

