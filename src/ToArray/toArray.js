/**
 * 
 * @param {string} content 
 * @returns {string[]}
 */
function toArray(content) {
  const DELIMIT = ';'

  let contentArray = content.split(DELIMIT)
    .map(x => x.trim())
  const lastIndex = contentArray.pop()
  if (!/\s*/.test(lastIndex)) {
    throw new SyntaxError('Statement(s) did not end with semi-colon.')
  }
  if (contentArray.includes('')) {
    throw new SyntaxError('Found statement with multiple semi-colons in a row.')
  }
  return contentArray
}

module.exports = toArray