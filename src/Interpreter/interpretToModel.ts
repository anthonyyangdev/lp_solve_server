import Model from '../Model/model'
import Eval from './Eval'

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