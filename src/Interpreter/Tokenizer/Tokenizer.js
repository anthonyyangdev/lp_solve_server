const StringBuilder = require('../StringBuilder/StringBuilder')
const Tokens = require('./Tokens')

function Tokenizer(input) {
  const currentString = new StringBuilder()
  const tokens = [[]]
  let row = 0
  let position = 0
  const blank = /\s/

  function validate(currentString) {
    const validToken = Tokens.getPossibleToken(currentString.toString())
    if (validToken) {
      if (validToken === Tokens.semi_colon) {
        tokens[++row] = []
        position = 0
      } else {
        tokens[row][position++] = {
          ...validToken,
          literal: currentString.toString()
        }
      }
    }
    currentString.clear()
  }

  for (let i = 0; i < input.length; i++) {
    const value = input[i]
    if (blank.test(value)) {
      continue
    }
    currentString.append(value)
    if (Tokens.tokenException(currentString.toString(), value, input[i + 1])) {
      continue
    }
    validate(currentString)
  }
  if (currentString.size() > 0)
    validate(currentString)

  return tokens
}

// const result = new Tokenizer('max: sum [i = 5 to 10] (x_i + sum [j = 3 to 6] (y_ij)); for i = 1 to 5: x_i <= 3; y <= 32;')
// console.log(result)

module.exports = Tokenizer