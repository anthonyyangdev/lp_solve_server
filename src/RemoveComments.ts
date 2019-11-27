/**
 * 
 * @param program The input program for LPSolver
 */
function removeComments(program: string): string {
  // Remove in-line comments
  program = program.replace(/\/\/.*/g, '')

  // Remove multi-line comments
  const DELIMIT = '/*'
  const ENDING = '*/'
  let index = program.indexOf(DELIMIT)
  const LEN = ENDING.length
  while (index >= 0) {
    let secondIndex = program.indexOf(ENDING)
    program = `${program.slice(0, index)}${program.slice(secondIndex + LEN)}`
    index = program.indexOf(DELIMIT)
  }
  return program
}

export default removeComments