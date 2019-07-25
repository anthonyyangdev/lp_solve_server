import Model from '../Models/Model'
import ParserType from './ParserType'
import Tokenizer from 'src/Interpreter/Tokenizer/Tokenizer';

interface ParserInterface {

  parse(stream: Tokenizer, type: ParserType): boolean;
  getModel(): Model;
  
}

export default ParserInterface