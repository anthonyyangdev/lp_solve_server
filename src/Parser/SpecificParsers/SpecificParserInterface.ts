import Model from '../../Models/Model'
import Tokenizer from 'src/Interpreter/Tokenizer/Tokenizer';

interface SpecificParserInterface {

  parse(model: Model, stream: Tokenizer): Model;

}

export default SpecificParserInterface