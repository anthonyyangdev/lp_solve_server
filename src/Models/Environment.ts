import SetModel from './SetModel'

export default class Environment {
  private map: any = {}

  public explicitAddContent(name: string, value: string) {
    this.map[name] = this.map[name] ? {
      name: name,
      value: value,
      next: this.map[name]
    } : {
        name: name,
        value: value,
        next: null
      }
  }

  public addContent(variable: SetModel) {
    const values = variable.getValues()
    this.explicitAddContent(values.name, values.value)
  }

  public unsetVariable(name: string) {
    if (this.map[name]) {
      const next = this.map[name].next
      if (next === null) {
        delete this.map[name]
      } else {
        this.map[name] = next
      }
    } else {
      throw new ReferenceError(`${name} is not found in the environment.`)
    }
  }

  public get(name: string): string {
    if (this.map[name] === undefined)
      throw new Error(`Undefined variable ${name}`)
    return this.map[name].value
  }

  public exist(name: string) {
    return this.map[name] !== undefined
  }

  public getAllVariables() {
    return Object.keys(this.map)
  }

  public applyVariables(input: string): string {
    for (const v in this.map) {
      input = input.replace(v, this.get(v))
    }
    return input
  }
}