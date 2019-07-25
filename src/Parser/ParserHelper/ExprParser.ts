import HelperParserInterface from "./HelperParserInterface";
import Tokenizer from "../../Interpreter/Tokenizer/Tokenizer";
import StringBuilder from 'src/StringBuilder/StringBuilder'
import TokenType from 'src/Interpreter/Tokenizer/TokenType'
import HelperParser from './HelperParserImpl'
import ParserType from '../ParserType'

export default class ExprParser implements HelperParserInterface {

  parse(stream: Tokenizer): string {
    let builder = new StringBuilder()
    let end = false
    while (!end && stream.hasNext()) {
      const type = stream.peek().getType()
      switch (type) {
        case TokenType.Word:
          const word = HelperParser.parse(stream, ParserType.Variable)
          builder.append(word)
          break
        case TokenType.Number:
          const number = HelperParser.parse(stream, ParserType.Number)
          builder.append(number)
          break
        case TokenType.MathOperator:
          const operator = HelperParser.parse(stream, ParserType.Operator)
          builder.append(operator)
          break
        case TokenType.Sum:
          const result = HelperParser.parse(stream, ParserType.Sum)
          builder.append(result)
          break
        case TokenType.LPAREN:
          const expr = HelperParser.parse(stream, ParserType.Expression)
          builder.append(expr)
          break
        case TokenType.RPAREN:
        default:
          end = true
      }
      if (!end) {
        stream.pop()
      }
    }

    const expr = builder.toString()
    return expr
  }

}


