import _StringBuilder = require('../StringBuilder/StringBuilder')
type StringBuilder = _StringBuilder.default
const StringBuilder = _StringBuilder.default

import _Tokens = require('./Tokens')
const Tokens = _Tokens.default

import _TOKEN = require('./Token')
type Token = _TOKEN.default
const Token = _TOKEN.default

class Tokenizer {

  private tokens: Token[] = []
  private traverselPosition = 0
  private lineCount = 1
  private tokenPosition = 1

  constructor(input: string) {
    const currentString = new StringBuilder()
    const tokens: Token[] = []
    let position = 0
    const blank = /\s/

    function validate(currentString: StringBuilder) {
      const validToken = Tokens.getPossibleToken(currentString.toString())
      if (validToken) {
        tokens[position++] = new Token({
          ...validToken,
          literal: currentString.toString()
        })
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

  /**
   * @returns {Token}
   */
  public poll() {
    const current = this.tokens[this.traverselPosition++]
    if (current.getType === Tokens.TYPES.SemiColon) {
      this.lineCount++
      this.tokenPosition = 1
    } else {
      this.tokenPosition++
    }
    return this.tokens[this.traverselPosition++]
  }

  public hasNext() {
    return this.tokens[this.traverselPosition] !== undefined
  }

  public clone() {
    return this.tokens.map(x => x.clone())
  }

  public getCurrentPosition() {
    return {
      line: this.lineCount,
      column: this.tokenPosition
    }
  }

  public static getType(token: Token) {
    return token.getType()
  }
}

export default Tokenizer