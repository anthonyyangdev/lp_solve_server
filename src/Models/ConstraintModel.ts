import AbstractModel from './AbstractModel'

export default class ConstraintModel extends AbstractModel {

  private name: string | undefined = undefined
  private expressions: string[] = []
  private relations: string[] = []

  public addName(name: string) {
    this.name = name
  }

  public addExpression(expr: string) {
    this.expressions.push(expr)
  }

  public addRelation(rel: string) {
    this.relations.push(rel)
  }

  private processRange() {
    if (this.relations.length !== 2) {
      throw new Error('Cannot parse constraint. Expected to be a range constraint.')
    }
    const name = this.name
    const expr1 = `${this.expressions[0]} ${this.relations[0]} ${this.expressions[1]}`
    const expr2 = `${this.expressions[1]} ${this.relations[1]} ${this.expressions[2]}`
    return {
      name,
      expr: [expr1, expr2]
    }
  }

  private processRelation() {
    if (this.relations.length !== 1) {
      throw new Error('Cannot parse constraint. Expected to be a relation constraint.')
    }
    const name = this.name
    const expr = `${this.expressions[0]} ${this.relations[0]} ${this.expressions[1]}`
    return {
      name,
      expr: [expr]
    }
  }

  getValues(): {
    name: string | undefined
    expr: string[]
  } {
    if (this.expressions.length === 3) {
      return this.processRange()
    } else if (this.expressions.length === 2) {
      return this.processRelation()
    } else {
      throw new Error('Cannot parse constraint. Incorrect number of constraints')
    }
  }
}