import ParserInterface from './ParserInterface'
import Model from '../Models/Model';

import Tokenizer from '../Interpreter/Tokenizer/Tokenizer';
import StatementParser from '../Parser/SpecificParsers/GeneralStatementParser'

export default class Parser implements ParserInterface {

  private model: Model

  constructor() {
    this.model = new Model()
  }

  parse(stream: Tokenizer): boolean {
    this.model = StatementParser.parse(this.model, stream)
    return true
  }

  getModel() {
    return this.model
  }

}

