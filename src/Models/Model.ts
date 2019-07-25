import SetModel from './SetModel'
import ObjectiveModel from './ObjectiveModel';
import TypeDeclareModel from './TypeDeclareModel';
import Environment from './Environment';

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

class TypeDeclarations {
  private integers: {
    variable: string
  }[]
  private free: {
    variable: string
  }[]
  private binary: {
    variable: string
  }[]

  constructor() {
    this.integers = []
    this.binary = []
    this.free = []
  }

  public add(type: string, variable: string) {

  }

}

class Model {
  private optimize = '_obj'
  private objective: Objectives
  private constraints: Constraints
  private env: Environment
  private constraintCount = 0
  private types: TypeDeclarations

  constructor() {
    this.objective = new Objectives()
    this.constraints = new Constraints()
    this.env = new Environment()
    this.types = new TypeDeclarations()
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

  public addTypeDeclaration(declaration: TypeDeclareModel) {
    const { type, variables } = declaration.getValues()
    for (const v of variables) {
      this.types.add(type, v)
    }
  }
}

export default Model