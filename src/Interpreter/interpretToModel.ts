import Eval from './EvalExtended'
import removeComments from '../RemoveComments'

/**
 * @param {string[]} content 
 */
export default function interpretToModel(content: string) {
  content = removeComments(content)
  const evaluator = new Eval()
  const completeModel = evaluator.eval(content)
  return completeModel
}