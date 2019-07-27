import StringBuilder from '../../StringBuilder/StringBuilder'
import TokenFunction from './TokensFunction'
import TYPES from './TokenType'
import Token from './Token'

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
      const validToken = TokenFunction.getPossibleToken(currentString.toString())
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
      const prev = currentString.toString()
      currentString.append(value)
      if (TokenFunction.tokenException(prev, value, input[i + 1])) {
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
   * Used for constraint name declaration. True if next two tokens are Word and Colon.
   * False otherwise.
   */
  public nextIsNameDeclare() {
    const isWord = this.tokens[this.traverselPosition].getType() === TYPES.Word
    const isColon = this.tokens[this.traverselPosition + 1].getType() === TYPES.Colon
    return isWord && isColon
  }

  /**
   * Pops and returns the next token in the token stream. 
   */
  public poll(): Token {
    const current = this.tokens[this.traverselPosition++]
    if (current === undefined) {
      throw new Error('There are no more tokens.')
    }
    if (current.getType() === TYPES.SemiColon) {
      this.lineCount++
      this.tokenPosition = 1
    } else {
      this.tokenPosition++
    }
    return current
  }

  public pop() {
    const current = this.tokens[this.traverselPosition++]
    if (current === undefined) {
      console.log('Ok')
    }
    if (current.getType() === TYPES.SemiColon) {
      this.lineCount++
      this.tokenPosition = 1
    } else {
      this.tokenPosition++
    }
  }

  public flushToEnd() {
    while (this.hasNext()) {
      if (this.peek().getType() === TYPES.SemiColon) {
        return
      } else {
        this.pop()
      }
    }
  }

  public hasNext() {
    return this.tokens[this.traverselPosition] !== undefined
  }

  /**
   * Makes a clone of the tokenizer at the same position.
   */
  public clone() {
    const tokenizer = new Tokenizer('')
    tokenizer.tokens = this.tokens.map(x => x.clone())
    tokenizer.traverselPosition = this.traverselPosition
    tokenizer.lineCount = this.lineCount
    tokenizer.tokenPosition = this.tokenPosition
    return tokenizer
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