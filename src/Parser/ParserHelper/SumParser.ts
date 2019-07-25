import Tokenizer from '../../Interpreter/Tokenizer/Tokenizer'
import TokenType from '../../Interpreter/Tokenizer/TokenType'
import IterationModel from '../../Models/IterationModel'
import HelperParserInterface from './HelperParserInterface';

import HelperParser from './HelperParserImpl'
import ParserType from '../ParserType';
import ParserError from '../ParserErrorMsg'
import Model from '../../Models/Model';
import Environment from '../../Models/Environment';

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

  parse(env: Environment, stream: Tokenizer): string {

    let sumModel = new IterationModel()
    for (const s of this.expected) {
      if (!stream.hasNext())
        throw new Error('There are no more tokens.')
      switch (s) {
        case TokenType.Word:
          const word = HelperParser.parse(env, stream, ParserType.Variable)
          sumModel.addVariable(word)
          break
        case TokenType.Expr:
          const expr = HelperParser.parse(env, stream, ParserType.Expression)
          sumModel.addExpr(expr)
          break
        default:
          const now = stream.poll()
          if (now.getType() !== s)
            throw new Error(ParserError.errorMsg(s, now, stream))
          break
      }
    }

    // Transform sum model into an expression
    const expr = sumModel.processModel(env, TokenType.Sum)
    return expr
  }

}