import ParserInterface from './ParserInterface'
import ParserType from './ParserType'
import Model from 'src/Models/Model';

import SpecificParser from './SpecificParsers/SpecificParserImpl'
import Tokenizer from 'src/Interpreter/Tokenizer/Tokenizer';

export default class Parser implements ParserInterface {

  private model: Model

  constructor() {
    this.model = new Model()
  }

  parse(stream: Tokenizer, type: ParserType): boolean {
    this.model = SpecificParser.parse(this.model, stream, type)
    return true
  }

  getModel() {
    return this.model
  }

}

