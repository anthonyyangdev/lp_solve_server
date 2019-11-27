import parseProgram from './parseProgram'

/**
 * @param {string} program The lp_solve program to be parsed and evaluated.
 */
export default function interpretToModel(program: string) {
  const programModel = parseProgram(program)
  const evaluator = new Eval()
  return evaluator.eval(programModel)
}