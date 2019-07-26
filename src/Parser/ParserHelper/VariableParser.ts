import HelperParserInterface from "./HelperParserInterface";
import Tokenizer from "src/Interpreter/Tokenizer/Tokenizer";
import Environment from "src/Models/Environment";


export default class VariableParser implements HelperParserInterface {
  parse(env: Environment, stream: Tokenizer): string {
    const word = stream.poll().getLiteral().trim()
    const regex = /[a-zA-Z]\w*/
    if (regex.test(word)) {
      const appliedVariables = env.applyVariables(word)
      return appliedVariables
    }
    else
      throw new SyntaxError(`The variable name ${word} is not valid.`)
  }

}