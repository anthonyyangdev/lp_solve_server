import AbstractModel from "./AbstractModel";

class TypeDeclareModel extends AbstractModel {

  private type: string | undefined
  private variables: string[] = []
  private count: number = 0

  public addType(type: string) {
    this.isDefined(this.type)
    this.type = type
  }

  public addVariable(name: string) {
    this.variables[this.count++] = name
  }

  public getValues(): Object {
    if (this.type === undefined || this.variables.length === 0) {
      throw new Error('Some values have not been defined in the TypeDeclareModel. Possibly dangerous to receive values.')
    }
    return {
      type: this.type,
      variables: this.variables
    }
  }

}

export default TypeDeclareModel