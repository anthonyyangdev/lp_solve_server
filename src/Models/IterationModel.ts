import AbstractModel from "./AbstractModel";

class IterationModel extends AbstractModel {

  private variable: any = undefined
  private expression: string[] = []
  private fullExpression: string = ''

  public addVariable(variable: string) {
    this.isDefined(this.variable)
    this.variable = variable;
  }

  public addExpr(expr: string) {
    this.expression.push(expr)
  }

  public getValues() {
    return {
      variable: this.variable,
      expr: this.expression
    }
  }

  public processModel(): string {
    return this.fullExpression
  }

}

export default IterationModel
