import Tokenizer from '../../Interpreter/Tokenizer/Tokenizer'
import TokenType from '../../Interpreter/Tokenizer/TokenType'

import SpecificParser from '../SpecificParsers/SpecificParserImpl'
import ParserType from '../ParserType'
import Model from '../../Models/Model';

export default class GeneralStatementParser {

  static parse(model: Model, stream: Tokenizer): Model {
    const current_type = stream.peek().getType()
    switch (current_type) {
      case TokenType.Sum:
        return SpecificParser.parse(model, stream, ParserType.Sum)
      case TokenType.Set:
        return SpecificParser.parse(model, stream, ParserType.Set)
      case TokenType.Objective:
        return SpecificParser.parse(model, stream, ParserType.Objective)
      case TokenType.VariableType:
        return SpecificParser.parse(model, stream, ParserType.TypeDeclare)
      default:
        throw new Error('Tokens do not match')
    }
  }

}