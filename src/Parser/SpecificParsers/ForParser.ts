import SpecificParserInterface from './SpecificParserInterface'
import Model from '../../Models/Model';
import Tokenizer from '../../Interpreter/Tokenizer/Tokenizer'
import TokenType from '../../Interpreter/Tokenizer/TokenType'
import IterationModel from '../../Models/IterationModel';
import HelperParser from '../ParserHelper/HelperParserImpl'
import ParserType from '../ParserType';
import ParserError from '../ParserErrorMsg'

export default class ForParser implements SpecificParserInterface {

  private expected = [
    TokenType.For,
    TokenType.Word,
    TokenType.Equal,
    TokenType.Expr,
    TokenType.To,
    TokenType.Expr,
    TokenType.Colon,
    TokenType.Expr
  ]

  parse(model: Model, stream: Tokenizer): Model {

    throw new Error('Not implemented')

    const forModel = new IterationModel()
    for (const s of this.expected) {
      if (!stream.hasNext())
        throw new Error('There are no more tokens.')
      let now = undefined
      switch (s) {
        case TokenType.Expr:
          const expr = HelperParser.parse(stream, ParserType.Expression)
          forModel.addExpr(expr)
          break
        case TokenType.Word:
          const word = HelperParser.parse(stream, ParserType.Variable)
          forModel.addVariable(word)
        default:
          now = stream.poll()
          if (now.getType() !== s)
            throw new Error(ParserError.errorMsg(s, now, stream))
          break
      }
    }

    const expr = forModel.processModel(TokenType.For)
    return model
  }

}




