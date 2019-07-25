import Tokenizer from '../../Interpreter/Tokenizer/Tokenizer'
import TokenType from '../../Interpreter/Tokenizer/TokenType'
import IterationModel from '../../Models/IterationModel'
import HelperParserInterface from './HelperParserInterface';

import HelperParser from './HelperParserImpl'
import ParserType from '../ParserType';
import ParserError from '../ParserErrorMsg'

export default class SumParser implements HelperParserInterface {

  private expected: TokenType[] = [
    TokenType.Sum,
    TokenType.LBRACKET,
    TokenType.Word,
    TokenType.Equal,
    TokenType.Expr,
    TokenType.To,
    TokenType.Expr,
    TokenType.RBRACKET,
    TokenType.LPAREN,
    TokenType.Expr,
    TokenType.RPAREN,
  ]

  parse(stream: Tokenizer): string {

    let sumModel = new IterationModel()
    for (const s of this.expected) {
      if (!stream.hasNext())
        throw new Error('There are no more tokens.')
      let now = undefined
      switch (s) {
        case TokenType.Word:
          const word = HelperParser.parse(stream, ParserType.Variable)
          sumModel.addVariable(word)
          break
        case TokenType.Expr:
          const expr = HelperParser.parse(stream, ParserType.Expression)
          sumModel.addExpr(expr)
          break
        default:
          now = stream.poll()
          if (now.getType() !== s)
            throw new Error(ParserError.errorMsg(s, now, stream))
          break
      }
    }

    // Transform sum model into an expression
    const expr = sumModel.processModel()
    return expr
  }

}