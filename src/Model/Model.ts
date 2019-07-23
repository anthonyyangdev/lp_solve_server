import SetModel from './SetModel'

class Model {
  private optimize = '_obj'
  private objective = {
    opType: undefined,
    expression: undefined
  }
  private constraints = {}
  private env: any = {}
  private constraintCount = 0

  public addSetVariable(variable: SetModel) {
    const v = variable.getValues()
    this.env[v.name] = v.value
  }

  public addRelationConstraint(expr: string) {
    throw new Error(`Not implemented: ${expr}`)
  }

  public addRangeConstraint(expr: string) {
    throw new Error(`Not implemented: ${expr}`)
  }

  public addObjective(objective: string) {
    throw new Error(`Not implemented: ${objective}`)
  }

  public addTypeDeclaration(declaration: string) {
    throw new Error(`Not implemented: ${declaration}`)
  }
}

export default Model