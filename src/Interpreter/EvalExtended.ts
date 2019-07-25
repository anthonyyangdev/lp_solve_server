import Tokenizer from './Tokenizer/Tokenizer'
import TokenType from './Tokenizer/TokenType'
import Model from '../Models/Model'
import Parser from '../Parser/Parser'
import ParserType from '../Parser/ParserType';

export default class Eval {

  private parserModel: Parser

  constructor() {
    this.parserModel = new Parser()
  }

  private parseToken(stream: Tokenizer) {
    const current_type = stream.peek().getType()
    switch (current_type) {
      case TokenType.Sum:
        return this.parserModel.parse(stream, ParserType.Sum)
      case TokenType.Set:
        return this.parserModel.parse(stream, ParserType.Set)
      case TokenType.Objective:
        return this.parserModel.parse(stream, ParserType.Objective)
      case TokenType.VariableType:
        return this.parserModel.parse(stream, ParserType.TypeDeclare)
    }
  }

  /**
   * @param {string} line 
   * @param {Model} model 
   * @returns {Model}
   */
  public eval(content: string): Model {
    let stream = new Tokenizer(content)
    while (stream.hasNext()) {
      let status = this.parseToken(stream)
      if (status) {
        continue
      } else {
        throw new Error('Error in parsing.')
      }
    }
    return this.parserModel.getModel()
  }
}