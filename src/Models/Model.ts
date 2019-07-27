import SetModel from './SetModel'
import ObjectiveModel from './ObjectiveModel';
import TypeDeclareModel from './TypeDeclareModel';
import Environment from './Environment';
import VariableType from './VariableTypes';
import ObjectiveType from './ObjectiveType'
import ConstraintModel from './ConstraintModel';
import StringBuilder from 'src/StringBuilder/StringBuilder';

class Constraints {
  private count: number = 0
  private map: any = {}

  public addConstraint(expression: string, name?: string) {
    let constraintName: string = name || `R${++this.count}`
    let count = 2
    while (this.map[constraintName] !== undefined) {
      constraintName = `${constraintName}_${count++}`
    }
    this.map[constraintName] = {
      name: constraintName,
      expr: expression
    }
  }

  public getConstraints() {
    let count = 0
    const arr = []
    for (const name in this.map) {
      arr[count++] = {
        name,
        expr: (this.map[name].expr as string)
      }
    }
    return arr
  }

}

class Objectives {
  private count: number = 0
  private map: {
    opType: string,
    expr: string
  }[]

  constructor() {
    this.map = []
  }

  public addObjective(type: ObjectiveType, expr: string) {
    const objectiveType = type === ObjectiveType.max ? 'max' : 'min'
    this.map[this.count++] = {
      opType: objectiveType,
      expr
    }
  }

  public getObjectives() {
    return this.map
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

  public addConstraint(expr: ConstraintModel) {
    const values = expr.getValues()
    if (values.expr.length === 1) {
      this.constraints.addConstraint(values.expr[0], values.name)
    } else {
      this.constraints.addConstraint(values.expr[0], values.name)
      this.constraints.addConstraint(values.expr[1], values.name)
    }
  }

  public getConstraint() {
    return this.constraints
  }

  public addObjective(objective: ObjectiveModel) {
    const value = objective.getValues()
    this.objective.addObjective(value.name, value.expr)
  }

  public getObjective() {
    return this.objective
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

  public getModelText(): string {
    let text = new StringBuilder()

    const objectives = this.objective.getObjectives()
    const constraints = this.constraints.getConstraints()
    const types = this.types.getAll()
    const ints = types.int
    const frees = types.free
    const bins = types.bin

    for (const o of objectives) {
      const objStatement = `${o.opType}: ${o.expr};\n`
      text.append(objStatement)
    }
    for (const c of constraints) {
      const conStatement = `${c.name}: ${c.expr};\n`
      text.append(conStatement)
    }

    text.append(ints.length > 0 ? '' : 'int ')
    for (let i = 0; i < ints.length; i++) {
      text.append(i === ints.length - 1 ? `${ints[i]};\n` : `${ints[i]}, `)
    }

    text.append(frees.length > 0 ? '' : 'free ')
    for (let i = 0; i < frees.length; i++) {
      text.append(i === frees.length - 1 ? `${frees[i]};\n` : `${frees[i]}, `)
    }

    text.append(bins.length > 0 ? '' : 'bin ')
    for (let i = 0; i < bins.length; i++) {
      text.append(i === bins.length - 1 ? `${bins[i]};\n` : `${bins[i]}, `)
    }
    return text.toString()
  }

}

export default Model