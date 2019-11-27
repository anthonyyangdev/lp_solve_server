/**
 * Creates an array, where each element is a statement of an lp_solve program.
 * The index of the array corresponds to the ordering of the statements.
 * 
 * @param program The program for lp_solve.
 * @returns An array consisting of each statement of the program 
 * in their original order.
 */
function toArray(program: string): Array<string> {
  const DELIMIT = ';'

  let statements: string[] = program
    .split(DELIMIT)
    .map(x => x.trim())
  const lastIndex: string = statements.pop() || ''
  if (!/\s*/.test(lastIndex)) {
    throw new SyntaxError('Statement(s) did not end with semi-colon.')
  }
  if (statements.some(x => x === '')) {
    throw new SyntaxError('Found statement with multiple semi-colons in a row.')
  }
  return statements
}

export default toArray