import HelperParserInterface from "./HelperParserInterface";
import Tokenizer from "src/Interpreter/Tokenizer/Tokenizer";


export default class VariableParser implements HelperParserInterface {
  parse(stream: Tokenizer): string {
    const word = stream.poll().getLiteral().trim()
    const regex = /[a-zA-Z]\w*/
    if (regex.test(word)) {
      return word
    }
    else
      throw new SyntaxError(`The variable name ${word} is not valid.`)
  }

}