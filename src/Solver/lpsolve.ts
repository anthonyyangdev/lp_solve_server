import Model from "src/Models/model";
const solve = require('javascript-lp-solver')

class ModelTranslation {
  static translateModel(model: Model): Object {
    return model
  }
}

export default function lpsolve(model: Model) {
  const translatedModel = ModelTranslation.translateModel(model)
  return solve.Solve(translatedModel)
}