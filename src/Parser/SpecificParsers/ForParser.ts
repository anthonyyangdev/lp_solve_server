import SpecificParserInterface from './SpecificParserInterface'
import Model from '../../Models/Model';
import Tokenizer from '../../Interpreter/Tokenizer/Tokenizer'
import TokenType from '../../Interpreter/Tokenizer/TokenType'
import IterationModel from '../../Models/IterationModel';
import HelperParser from '../ParserHelper/HelperParserImpl'
import StatementParser from '../SpecificParsers/GeneralStatementParser'
import ParserType from '../ParserType';
import ParserError from '../ParserErrorMsg'
const mathjs = require('mathjs')

export default class ForParser implements SpecificParserInterface {

  private expected = [
    TokenType.For,
    TokenType.Word,
    TokenType.Equal,
    TokenType.Expr,
    TokenType.To,
    TokenType.Expr,
    TokenType.Colon,
    TokenType.Statement
  ]

  parse(model: Model, stream: Tokenizer): Model {

    const env = model.getEnvironment()
    // throw new Error('Not implemented')

    const forModel = new IterationModel()
    for (const s of this.expected) {
      if (!stream.hasNext())
        throw new Error('There are no more tokens.')
      let now = undefined
      switch (s) {
        case TokenType.Expr:
          const expr = HelperParser.parse(env, stream, ParserType.Expression)
          forModel.addExpr(expr)
          break
        case TokenType.Word:
          const word = HelperParser.parse(env, stream, ParserType.Variable)
          forModel.addVariable(word)
          break
        case TokenType.Statement:
          const values = forModel.getValues()
          const name = values.variable
          const start = mathjs.evaluate(env.applyVariables(values.expr[0]))
          const end = mathjs.evaluate(env.applyVariables(values.expr[1]))
          for (let a = start; a <= end; a++) {
            env.explicitAddContent(name, a)
            const frozenStream = stream.clone()
            model = StatementParser.parse(model, frozenStream)
          }
          stream.flushToEnd();
          return model
        default:
          now = stream.poll()
          if (now.getType() !== s)
            throw new Error(ParserError.errorMsg(s, now, stream))
          break
      }
    }
    return model
  }

}




