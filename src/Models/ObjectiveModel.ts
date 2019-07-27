import AbstractModel from './AbstractModel'
import ObjectiveType from './ObjectiveType'

class ObjectiveModel extends AbstractModel {

  private name: ObjectiveType | undefined = undefined
  private expr: string | undefined = undefined

  public addObjective(name: string) {
    this.isDefined(this.name)
    switch (name) {
      case 'min':
      case 'minimize':
        this.name = ObjectiveType.min
        return
      case 'max':
      case 'maximize':
        this.name = ObjectiveType.max
        return
      default:
        throw new Error(`Unexpected objective: ${name}`)
    }
  }

  public addExpression(value: string) {
    this.isDefined(this.expr)
    this.expr = value
  }

  public getValues() {
    if (!(this.name && this.expr)) {
      throw new Error('Objective Model contains an empty value. Dangerous to receive.')
    }
    return {
      name: this.name,
      expr: (this.expr as string)
    }
  }

}

export default ObjectiveModel