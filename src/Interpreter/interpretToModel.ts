import Eval from './EvalExtended'
import removeComments from '../RemoveComments'

/**
 * @param {string} program The lp_solve program to be parsed to and interpreted.
 */
export default function interpretToModel(program: string) {
  program = removeComments(program)
  const evaluator = new Eval()
  const completeModel = evaluator.eval(program)
  return completeModel
}