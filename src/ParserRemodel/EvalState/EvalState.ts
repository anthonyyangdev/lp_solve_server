import EvalValue from './EvalValue'

export default class EvalState {

  private state: Map<number, EvalValue>

  public constructor() {
    this.state = new Map()
  }

  public addBinding(loc: number, value: EvalValue) {
    this.state.set(loc, value)
  }

  public removeBinding(loc: number) {
    this.state.delete(loc)
  }


}