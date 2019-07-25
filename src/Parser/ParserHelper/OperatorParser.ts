import HelperParserInterface from "./HelperParserInterface";
import Tokenizer from "src/Interpreter/Tokenizer/Tokenizer";
import Environment from "src/Models/Environment";


export default class OperatorParser implements HelperParserInterface {
  parse(env: Environment, stream: Tokenizer): string {
    const operator = stream.poll().getLiteral().trim()
    const regex = /[+-]/
    if (regex.test(operator)) {
      return operator
    }
    else
      throw new SyntaxError(`The operator ${operator} is not valid.`)
  }

}