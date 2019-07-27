import Tokenizer from './Tokenizer/Tokenizer'
import Model from '../Models/Model'
import Parser from '../Parser/Parser'
import TokenType from './Tokenizer/TokenType'

export default class Eval {

  private parserModel: Parser

  constructor() {
    this.parserModel = new Parser()
  }

  private parseStatement(stream: Tokenizer) {
    return this.parserModel.parse(stream)
  }

  /**
   * @param {string} line 
   * @param {Model} model 
   * @returns {Model}
   */
  public eval(content: string): Model {
    let stream = new Tokenizer(content)
    while (stream.hasNext()) {
      let status = this.parseStatement(stream)
      if (status) {
        const isSemiColon = stream.poll().getType() === TokenType.SemiColon
        if (isSemiColon)
          continue
        else
          throw new Error('Statement does not conclude with semi-colon.')
      } else {
        throw new Error('Error in parsing.')
      }
    }
    return this.parserModel.getModel()
  }
}