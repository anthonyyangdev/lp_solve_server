import Tokenizer from '../../Interpreter/Tokenizer/Tokenizer';
import HelperParserInterface from './HelperParserInterface'
import Environment from '../../Models/Environment';

export default class NumberParser implements HelperParserInterface {

  parse(env: Environment, stream: Tokenizer): string {
    const number = stream.poll().getLiteral().trim()
    const regex = /^(([0-9]*\.[0-9]+)|([0-9]+\.?))$/
    if (regex.test(number)) {
      return number
    }
    else
      throw new SyntaxError(`The number ${number} is not valid.`)
  }
}