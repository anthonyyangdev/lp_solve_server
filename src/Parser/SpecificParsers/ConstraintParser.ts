import SpecificParserInterface from "./SpecificParserInterface";
import Model from "../../Models/Model";
import Tokenizer from "../../Interpreter/Tokenizer/Tokenizer";
import TokenType from '../../Interpreter/Tokenizer/TokenType'
import ConstraintModel from '../../Models/ConstraintModel'
import Parser from '../ParserHelper/HelperParserImpl'
import ParserType from "../ParserType";

export default class ConstraintParser implements SpecificParserInterface {

  parse(model: Model, stream: Tokenizer): Model {

    const constraintModel = new ConstraintModel()

    if (stream.nextIsNameDeclare()) {
      const name = stream.poll().getLiteral()
      stream.pop()
      constraintModel.addName(name)
    }

    while (stream.peek().getType() !== TokenType.SemiColon) {
      const next = stream.peek().getType()
      switch (next) {
        case TokenType.GTE:
        case TokenType.LTE:
        case TokenType.Equal:
        case TokenType.LT:
        case TokenType.GT:
          const relation = stream.poll()
          constraintModel.addRelation(relation.getLiteral())
          break
        default:
          // Assume it is an expression
          const env = model.getEnvironment()
          const expr = Parser.parse(env, stream, ParserType.Expression)
          constraintModel.addExpression(expr)
          break
      }
    }
    // Set constraint into the model
    model.addConstraint(constraintModel)
    return model
  }
}