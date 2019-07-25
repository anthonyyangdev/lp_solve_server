import AbstractModel from "./AbstractModel";
import TokenType from '../Interpreter/Tokenizer/TokenType'
import Model from "./Model";
import Environment from "./Environment";
const mathjs = require('mathjs')

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

  private getFunctionExpression() {
    return this.expression[2]
  }

  private getStartValue(): number {
    const expr = this.expression[0]
    let value: number = 1
    try {
      value = mathjs.evaluate(expr)
    } catch (e) {
      throw new Error('Sum start index cannot be evaluated as a number.')
    }
    return value
  }

  private getEndValue(): number {
    const expr = this.expression[1]
    let value: number = 1
    try {
      value = mathjs.evaluate(expr)
    } catch (e) {
      throw new Error('Sum start index cannot be evaluated as a number.')
    }
    return value
  }

  public processSumStatement(env: Environment): string {
    const start = this.getStartValue()
    const end = this.getEndValue()
    const expression = this.getFunctionExpression()
    for (let i = start; i <= end; i++) {
      let term = expression.replace(/\i/gm, (i).toString())
      for (const e of env.getAllVariables()) {
        term = term.replace(e, env.get(e))
      }
      this.fullExpression += i === end ? `${term}` : `${term} + `
    }
    return this.fullExpression
  }

  public processModel(env: Environment, type: TokenType): string {
    if (this.expression.length !== 3) {
      throw new Error(`Model Error: Iteration Model does not have 3 expressions.\nThere are ${this.expression.length} expressions.`)
    }
    // Process the model.
    switch (type) {
      case TokenType.Sum:
        break
      case TokenType.For:
        break
      default:
        throw new Error(`Cannot process under the ${type} type. It must be either ${TokenType.Sum} or ${TokenType.For}`)
    }
    return this.fullExpression
  }

}

export default IterationModel
