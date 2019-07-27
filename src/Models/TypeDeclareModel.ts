import AbstractModel from "./AbstractModel";
import VariableType from "./VariableTypes";

class TypeDeclareModel extends AbstractModel {

  private type: VariableType | undefined
  private variables: string[] = []
  private count: number = 0

  public addType(type: VariableType) {
    this.isDefined(this.type)
    this.type = type
  }

  public addVariable(name: string) {
    this.variables[this.count++] = name
  }

  public getValues() {
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