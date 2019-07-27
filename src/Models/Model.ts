import SetModel from './SetModel'
import ObjectiveModel from './ObjectiveModel';
import TypeDeclareModel from './TypeDeclareModel';
import Environment from './Environment';
import VariableType from './VariableTypes';

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
  private integers: string[]
  private int_count = 0
  private free: string[]
  private free_count = 0
  private binary: string[]
  private bin_count = 0

  constructor() {
    this.integers = []
    this.binary = []
    this.free = []
  }

  public add(type: VariableType, variable: string): boolean {
    switch (type) {
      case VariableType.Int:
        this.integers[this.int_count++] = variable
        break
      case VariableType.Free:
        this.free[this.free_count++] = variable
        break
      case VariableType.Bin:
        this.binary[this.bin_count++] = variable
        break
    }
    return true
  }

  public getAll() {
    return {
      int: this.integers,
      free: this.free,
      bin: this.binary
    }
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

  public getAllTypeDeclarations() {
    return this.types.getAll()
  }

}

export default Model