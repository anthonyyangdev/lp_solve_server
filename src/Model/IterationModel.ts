class IterationModel {

  private variable: any = undefined
  private start: any = undefined
  private end: any = undefined
  private expression: any = undefined

  private isDefined(self: any) {
    if (self !== undefined)
      throw new Error('The For Model overloaded.')
  }

  public addVariable(variable: string) {
    this.isDefined(this.variable)
    this.variable = variable;
  }

  public addValue(value: number) {
    if (this.start === undefined) {
      this.start = value
    }
    else if (this.end === undefined) {
      this.end = value
    }
    else {
      throw new Error('The Sum Model overloaded.')
    }
  }

  public addExpr(expr: string) {
    this.isDefined(this.expression)
    this.expression = expr
  }

  public getModelInfo() {
    return {
      variable: this.variable,
      start: this.start,
      end: this.end,
      expr: this.expression
    }
  }
}

export default IterationModel
