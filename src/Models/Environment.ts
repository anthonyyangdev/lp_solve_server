import SetModel from './SetModel'

export default class Environment {
  private map: any = {}

  public addContent(variable: SetModel) {
    const values = variable.getValues()
    this.map[values.name] = values.value
  }

  public get(name: string): string {
    return this.map[name]
  }

  public exist(name: string) {
    return this.map[name] !== undefined
  }

  public getAllVariables() {
    return Object.keys(this.map)
  }
}