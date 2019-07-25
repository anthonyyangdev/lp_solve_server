import Eval from './EvalExtended'
import removeComments from '../RemoveComments'
/**
 * @param {string[]} content 
 */
export default function interpretToModel(content: string) {
  content = removeComments(content)
  let evaluator = new Eval()
  return evaluator.eval(content)
}