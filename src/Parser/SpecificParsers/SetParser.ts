import SpecificParserInterface from './SpecificParserInterface'
import Model from '../../Models/Model';
import Tokenizer from '../../Interpreter/Tokenizer/Tokenizer'
import TokenType from '../../Interpreter/Tokenizer/TokenType'
import SetModel from '../../Models/SetModel'
import HelperParser from '../ParserHelper/HelperParserImpl'
import ParserType from '../ParserType';
import ParserError from '../ParserErrorMsg'

export default class SetParser implements SpecificParserInterface {

  private expected = [
    TokenType.Set,
    TokenType.Word,
    TokenType.Equal,
    TokenType.Expr,
  ]

  parse(model: Model, stream: Tokenizer): Model {

    const variable = new SetModel()
    for (const s of this.expected) {
      if (!stream.hasNext())
        throw new Error('There are no more tokens.')
      let now = undefined
      switch (s) {
        case TokenType.Word:
          const word = HelperParser.parse(stream, ParserType.Variable)
          variable.addName(word)
          break
        case TokenType.Expr:
          const expr = HelperParser.parse(stream, ParserType.Expression)
          variable.addValue(expr)
          break
        default:
          now = stream.poll()
          if (now.getType() !== s)
            throw new Error(ParserError.errorMsg(s, now, stream))
          break
      }
    }

    const moreSetVariables = [variable]
    while (stream.peek().getType() !== TokenType.SemiColon) {
      const setVar = new SetModel()
      for (const s of this.expected) {
        if (!stream.hasNext())
          throw new Error('There are no more tokens.')
        let now = undefined
        switch (s) {
          case TokenType.Word:
            now = stream.poll()
            const word = HelperParser.parse(stream, ParserType.Variable)
            setVar.addName(word)
            break
          case TokenType.Expr:
            const expr = HelperParser.parse(stream, ParserType.Expression)
            setVar.addValue(expr)
            break
          default:
            now = stream.poll()
            if (now.getType() !== s)
              throw new Error(ParserError.errorMsg(s, now, stream))
            break
        }
      }
      moreSetVariables.push(setVar)
    }

    for (const v of moreSetVariables)
      model.addSetVariable(v)

    return model
  }

}


