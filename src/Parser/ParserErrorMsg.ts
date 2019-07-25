import TokenType from '../Interpreter/Tokenizer/TokenType'
import Token from '../Interpreter/Tokenizer/Token'
import Tokenizer from '../Interpreter/Tokenizer/Tokenizer'

export default class ParserError {
  public static errorMsg(expected: TokenType, actual: Token, stream: Tokenizer) {
    const positions = stream.getCurrentPosition()
    const actualLiteral = actual.getLiteral()
    const row = positions.line
    const col = positions.column
    return `Expected ${expected} but encountered ${actualLiteral} at line ${row}, word ${col}`
  }
}