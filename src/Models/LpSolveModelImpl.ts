import LPSolveModel from './LpSolveModel'
import Model from './Model'

export default class LPSolveModelImpl {

  /**
   * Initiate a LPSolveModel that corresponds to the model used in the
   * 'javascript-lp-solve'
   */
  static init(): LPSolveModel {
    return {
      optimize: '_obj',
      opType: undefined,
      constraints: {},
      variables: {},
      ints: {},
      binaries: {},
      unrestricted: {}
    }
  }

  static addConstraints(lp_model: LPSolveModel, model: Model): LPSolveModel {
    const constraints = model.getConstraint().getConstraints()
    lp_model.constraints = {
      
    }
    return lp_model
  }

}

