import removeComments from '../RemoveComments'
import toStatements from '../ToArray/toArray'

/**
 * @param {string} program The lp_solve program to be parsed and evaluated.
 */
export default function interpretToModel(program: string) {
  program = removeComments(program)
  const statements = toStatements(program)
  const programModel = parseStatements(statements)
  const evaluator = new Eval()
  return evaluator.eval(programModel)
}