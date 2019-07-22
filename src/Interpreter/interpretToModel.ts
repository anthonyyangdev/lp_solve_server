import _Model = require('../Model/model')
type Model = _Model.default
const Model = _Model.default

import _Eval = require('./Eval')
const Eval = _Eval.default

/**
 * @param {string[]} content 
 */
function interpretToModel(content: string[]) {
  let model = new Model()
  let evaluator = new Eval()
  for (let i = 0; i < content.length; i++) {
    const currentLine = content[i]
    model = evaluator.eval(currentLine, model)
  }
  return model
}

export default interpretToModel