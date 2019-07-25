import AbstractModel from "./AbstractModel";

class SetModel extends AbstractModel {

  private name: string | undefined = undefined
  private value: string | undefined = undefined

  public addName(name: string) {
    this.isDefined(this.name)
    this.name = name
  }

  public addValue(value: string) {
    this.isDefined(this.value)
    this.value = value
  }

  public getValues() {
    if (!(this.name && this.value)) {
      throw new Error('SetModel contains an empty value. Dangerous to receive.')
    }
    return {
      name: (this.name as string),
      value: (this.value as string)
    }
  }

}

export default SetModel