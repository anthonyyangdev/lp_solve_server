import SpecificParserInterface from './SpecificParserInterface'
import Model from '../../Models/Model';
import Tokenizer from '../../Interpreter/Tokenizer/Tokenizer'
import TokenType from '../../Interpreter/Tokenizer/TokenType'
import TypeDeclareModel from '../../Models/TypeDeclareModel'

import HelperParser from '../ParserHelper/HelperParserImpl'
import ParserType from '../ParserType';
import VariableType from '../../Models/VariableTypes';

export default class TypeDeclareParser implements SpecificParserInterface {

  private expected = [
    TokenType.Comma,
    TokenType.Word
  ]

  parse(model: Model, stream: Tokenizer): Model {

    const typeDeclareModel = new TypeDeclareModel()
    const env = model.getEnvironment()

    const checkPossible = (expected: TokenType, closure: any) => {
      const actualType = stream.peek().getType()
      if (actualType === expected) {
        closure()
      } else {
        throw new Error(`Was expecting ${expected} but found ${actualType} instead.`)
      }
    }

    checkPossible(TokenType.VariableType, () => {
      let type
      const value = stream.poll().getLiteral()
      switch (value) {
        case 'int':
          type = VariableType.Int
          break
        case 'free':
          type = VariableType.Free
          break
        case 'bin':
          type = VariableType.Bin
          break
        default:
          throw new Error(`Type ${value} cannot be declared.`)
      }
      typeDeclareModel.addType(type)
    })
    checkPossible(TokenType.Word, () => {
      const word = HelperParser.parse(env, stream, ParserType.Variable)
      typeDeclareModel.addVariable(word)
    })

    while (stream.peek().getType() !== TokenType.SemiColon) {
      for (const s of this.expected) {
        if (s === TokenType.Comma) {
          checkPossible(TokenType.Comma, () => { stream.pop() })
        } else {
          checkPossible(TokenType.Word, () => {
            const word = HelperParser.parse(env, stream, ParserType.Variable)
            typeDeclareModel.addVariable(word)
          })
        }
      }
    }
    model.addTypeDeclaration(typeDeclareModel)
    return model
  }

}





