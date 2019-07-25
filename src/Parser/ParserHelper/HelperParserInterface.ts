import Tokenizer from '../../Interpreter/Tokenizer/Tokenizer';
import Environment from '../../Models/Environment';

interface HelperParserInterface {

  parse(env: Environment, stream: Tokenizer): string;

}

export default HelperParserInterface