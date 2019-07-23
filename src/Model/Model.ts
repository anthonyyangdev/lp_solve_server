import SetModel from './SetModel'
import { expression } from '@babel/template';
import ObjectiveModel from './ObjectiveModel';

class Environment {
  private map: any = {}

  public addContent(variable: SetModel) {
    const values = variable.getValues()
    this.map[values.name] = values.value
  }

  public get(name: string) {
    return this.map[name]
  }

  public exist(name: string) {
    return this.map[name] !== undefined
  }

  public getAllVariables() {
    return Object.keys(this.map)
  }
}

class Constraints {
  private count: number = 1
  private map: any = {}

  public addConstraint(expression: string) {
    this.map[`R${this.count++}`] = expression
  }
}

class Objectives {
  private count: number = 0
  private map: {
    opType: string,
    expression: string
  }[]

  constructor() {
    this.map = []
  }

  public addConstraint(expression: string) {
    this.map[this.count++] = {
      opType: 'max',
      expression
    }
  }
}

class Model {
  private optimize = '_obj'
  private objective: Objectives
  private constraints: Constraints
  private env: Environment
  private constraintCount = 0

  constructor() {
    this.objective = new Objectives()
    this.constraints = new Constraints()
    this.env = new Environment()
  }

  public addSetVariable(variable: SetModel) {
    this.env.addContent(variable)
  }

  public getEnvironment() {
    return this.env
  }

  public addRelationConstraint(expr: string) {
    throw new Error(`Not implemented: ${expr}`)
  }

  public addRangeConstraint(expr: string) {
    throw new Error(`Not implemented: ${expr}`)
  }

  public addObjective(objective: ObjectiveModel) {
    throw new Error(`Not implemented: ${objective}`)
  }

  public addTypeDeclaration(declaration: string) {
    throw new Error(`Not implemented: ${declaration}`)
  }
}

export default Model