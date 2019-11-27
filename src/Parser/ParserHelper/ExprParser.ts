import HelperParserInterface from "./HelperParserInterface";
import Tokenizer from "../../Interpreter/Tokenizer/Tokenizer";
import StringBuilder from '../../StringBuilder/StringBuilder'
import TokenType from '../../Interpreter/Tokenizer/TokenType'
import HelperParser from './HelperParserImpl'
import ParserType from '../ParserType'
import Environment from "../../Models/Environment";

export default class ExprParser implements HelperParserInterface {

  parse(env: Environment, stream: Tokenizer): string {
    let builder = new StringBuilder()
    let end = false
    console.trace(true)
    while (!end && stream.hasNext()) {
      const type = stream.peek().getType()
      switch (type) {
        case TokenType.Word:
          const word = HelperParser.parse(env, stream, ParserType.Variable)
          builder.append(word)
          break
        case TokenType.Number:
          const number = HelperParser.parse(env, stream, ParserType.Number)
          builder.append(number)
          break
        case TokenType.MathOperator:
          const operator = HelperParser.parse(env, stream, ParserType.Operator)
          builder.append(operator)
          break
        case TokenType.Sum:
          const result = HelperParser.parse(env, stream, ParserType.Sum)
          builder.append(result)
          break
        default:
          end = true
      }
    }

    const expr = builder.toString()
    return expr
  }

}


