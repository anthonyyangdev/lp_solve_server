import Tokenizer from '../../Interpreter/Tokenizer/Tokenizer';
import ParserType from '../ParserType'
import VariableParser from './VariableParser'
import SumParser from './SumParser'
import NumberParser from './NumberParser'
import OperatorParser from './OperatorParser'
import ExprParser from './ExprParser'
import Environment from '../../Models/Environment'

export default class HelperParser {

  private static Variable = new VariableParser()
  private static Sum = new SumParser()
  private static Number = new NumberParser()
  private static Operator = new OperatorParser()
  private static Expr = new ExprParser()

  static parse(env: Environment, stream: Tokenizer, type: ParserType) {
    switch (type) {
      case ParserType.Expression:
        return this.Expr.parse(env, stream)
      case ParserType.Number:
        return this.Number.parse(env, stream)
      case ParserType.Variable:
        return this.Variable.parse(env, stream)
      case ParserType.Operator:
        return this.Operator.parse(env, stream)
      case ParserType.Sum:
        return this.Sum.parse(env, stream)
      default:
        throw new Error(`${type} cannot be parsed by a helper Parser.`)
    }
  }
}