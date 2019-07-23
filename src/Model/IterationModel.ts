class IterationModel {

  private variable: any = undefined
  private expression: string[] = []

  private isDefined(self: any) {
    if (self !== undefined)
      throw new Error('The For Model overloaded.')
  }

  public addVariable(variable: string) {
    this.isDefined(this.variable)
    this.variable = variable;
  }

  public addExpr(expr: string) {
    this.expression.push(expr)
  }

  public getModelInfo() {
    return {
      variable: this.variable,
      expr: this.expression
    }
  }
}

export default IterationModel
