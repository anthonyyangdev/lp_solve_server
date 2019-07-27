import Tokenizer from '../../Interpreter/Tokenizer/Tokenizer';
import ParserType from '../ParserType'
import ObjectiveParser from './ObjectiveParser'
import SetParser from './SetParser'
import TypeDeclareParser from './TypeDeclareParser'
import Model from '../../Models/Model';
import ForParser from './ForParser';
import ConstraintParser from './ConstraintParser'

export default class SpecificParser {

  private static Objective = new ObjectiveParser()
  private static Set = new SetParser()
  private static TypeDeclare = new TypeDeclareParser()
  private static For = new ForParser()
  private static Constraint = new ConstraintParser()

  static parse(model: Model, stream: Tokenizer, type: ParserType) {
    switch (type) {
      case ParserType.Objective:
        return this.Objective.parse(model, stream)
      case ParserType.Set:
        return this.Set.parse(model, stream)
      case ParserType.TypeDeclare:
        return this.TypeDeclare.parse(model, stream)
      case ParserType.For:
        return this.For.parse(model, stream)
      case ParserType.Constraint:
        return this.Constraint.parse(model, stream)
      default:
        throw new Error(`${type} cannot be parsed by a specific Parser.`)
    }
  }
}