import Model from "src/Models/model";
import LPSolveModel from 'src/Models/LpSolveModel'
const solve = require('javascript-lp-solver')

class ModelTranslation {

  /**
   * Translates this library's model interface into a model that can be understood
   * by 'javascript-lp-solver'.
   * @param model 
   */
  static translateModel(model: Model): LPSolveModel {
    console.log(model)
    return model
  }
}

export default function lpsolve(model: Model) {
  const translatedModel = ModelTranslation.translateModel(model)
  return translatedModel
  // return solve.Solve(translatedModel)
}