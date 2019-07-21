const StringBuilder = require('../StringBuilder/StringBuilder')
const Tokens = require('./Tokens')

class Tokenizer {

  private tokens = []
  private traverselPosition = 0

  constructor(input) {
    const currentString = new StringBuilder()
    const tokens = []
    let position = 0
    const blank = /\s/

    function validate(currentString) {
      const validToken = Tokens.getPossibleToken(currentString.toString())
      if (validToken) {
        tokens[position++] = {
          ...validToken,
          literal: currentString.toString()
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

    this.tokens = tokens
  }

  public peek() {
    if (this.traverselPosition === this.tokens.length) {
      throw new Error('There are no more tokens.')
    }
    return this.tokens[this.traverselPosition]
  }

  public poll() {
    return this.tokens[this.traverselPosition++]
  }

  public hasNext() {
    return this.tokens[this.traverselPosition] !== undefined
  }

}

module.exports = Tokenizer