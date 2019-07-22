class Model {
  private optimize = '_obj'
  private objective = {
    opType: undefined,
    expression: undefined
  }
  private constraints = {}
  private env = {}
  private constraintCount = 0

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