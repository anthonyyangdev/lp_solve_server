import Tokenizer from '../../Interpreter/Tokenizer/Tokenizer'
import TokenType from '../../Interpreter/Tokenizer/TokenType'

import SpecificParser from '../SpecificParsers/SpecificParserImpl'
import ParserType from '../ParserType'
import Model from '../../Models/Model';

export default class GeneralStatementParser {

  static parse(model: Model, stream: Tokenizer): Model {
    const current_type = stream.peek().getType()
    switch (current_type) {
      case TokenType.Objective:
        return SpecificParser.parse(model, stream, ParserType.Objective)
      case TokenType.Sum:
        return SpecificParser.parse(model, stream, ParserType.Sum)
      case TokenType.Set:
        return SpecificParser.parse(model, stream, ParserType.Set)
      case TokenType.VariableType:
        return SpecificParser.parse(model, stream, ParserType.TypeDeclare)
      case TokenType.For:
        return SpecificParser.parse(model, stream, ParserType.For)
      default:
        // Assume that the statement is an objective.
        return SpecificParser.parse(model, stream, ParserType.Constraint)
    }
  }

}