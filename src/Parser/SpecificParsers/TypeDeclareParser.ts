import SpecificParserInterface from './SpecificParserInterface'
import Model from '../../Models/Model';
import Tokenizer from '../../Interpreter/Tokenizer/Tokenizer'
import TokenType from '../../Interpreter/Tokenizer/TokenType'
import TypeDeclareModel from '../../Models/TypeDeclareModel'

import HelperParser from '../ParserHelper/HelperParserImpl'
import ParserType from '../ParserType';

export default class TypeDeclareParser implements SpecificParserInterface {

  private expected = [
    TokenType.Comma,
    TokenType.Word
  ]

  parse(model: Model, stream: Tokenizer): Model {

    const typeDeclareModel = new TypeDeclareModel()

    const checkPossible = (expected: TokenType, closure: any) => {
      const actualType = stream.peek().getType()
      if (actualType === expected) {
        closure()
      } else {
        throw new Error(`Was expecting a ${expected} but received ${actualType} instead.`)
      }
    }

    checkPossible(TokenType.VariableType, () => {
      typeDeclareModel.addType(stream.poll().getLiteral())
    })
    checkPossible(TokenType.Word, () => {
      const word = HelperParser.parse(stream, ParserType.Variable)
      typeDeclareModel.addVariable(word)
    })

    while (stream.peek().getType() !== TokenType.SemiColon) {
      for (const s of this.expected) {
        checkPossible(TokenType.Word, () => {
          const word = HelperParser.parse(stream, ParserType.Variable)
          typeDeclareModel.addVariable(word)
        })
      }
    }
    model.addTypeDeclaration(typeDeclareModel)
    return model
  }

}





