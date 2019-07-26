import AbstractModel from "./AbstractModel";
import TokenType from '../Interpreter/Tokenizer/TokenType'
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
        if (term.match(e)) {
          const value = env.get(e)
          if (value === undefined)
            throw new ReferenceError(`Undefined variable ${e}.`)
          term = term.replace(e, value)
        }
      }
      this.fullExpression += i === end ? `${term}` : `${term} + `
    }
    return this.fullExpression
  }

  private processForStatement(): string {
    return this.expression[2]
  }

  public processModel(type: TokenType, env?: Environment): string {
    if (this.expression.length !== 3) {
      throw new Error(`Model Error: Iteration Model does not have 3 expressions.\nThere are ${this.expression.length} expressions.`)
    }
    // Process the model.
    switch (type) {
      case TokenType.Sum:
        if (env === undefined) {
          throw new ReferenceError('Environment is not defined during model processing.')
        }
        return this.processSumStatement(env)
      case TokenType.For:
        return this.processForStatement()
      default:
        throw new Error(`Cannot process under the ${type} type. It must be either ${TokenType.Sum} or ${TokenType.For}`)
    }
  }

}

export default IterationModel
