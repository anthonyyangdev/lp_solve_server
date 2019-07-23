class SetModel {

  private name: string | undefined = undefined
  private value: string | undefined = undefined

  private isDefined(self: string | undefined) {
    if (self !== undefined) {
      throw new Error(`SetModel overloaded. Duplicate properties. ${self} is already a value.`)
    }
  }

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