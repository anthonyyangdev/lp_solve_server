function toArray(content: string) {
  const DELIMIT = ';'

  let contentArray: string[] = content.split(DELIMIT)
    .map(x => x.trim())
  const lastIndex: string = contentArray.pop() || ''
  if (!/\s*/.test(lastIndex)) {
    throw new SyntaxError('Statement(s) did not end with semi-colon.')
  }
  if (contentArray.some(x => x === '')) {
    throw new SyntaxError('Found statement with multiple semi-colons in a row.')
  }
  return contentArray
}

export default toArray