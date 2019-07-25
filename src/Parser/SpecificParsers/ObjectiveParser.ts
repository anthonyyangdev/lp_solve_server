import SpecificParserInterface from './SpecificParserInterface'
import Model from '../../Models/Model';
import Tokenizer from '../../Interpreter/Tokenizer/Tokenizer'
import TokenType from '../../Interpreter/Tokenizer/TokenType'
import ObjectiveModel from '../../Models/ObjectiveModel'

export default class ObjectiveParser implements SpecificParserInterface {

  private expected = [
    TokenType.Objective,
    TokenType.SemiColon,
    TokenType.Colon,
    TokenType.Expr,
  ]

  parse(model: Model, stream: Tokenizer): Model {

    const objective = new ObjectiveModel()
    for (const s of this.expected) {
      if (!stream.hasNext())
        throw new Error('There are no more tokens.')
      let now = undefined
      switch (s) {
        case TokenType.Objective:
          now = stream.poll()
          const opType = now.getLiteral()
          objective.addObjective(opType)
          break
        case TokenType.Expr:
          const res = this.parseExpression(stream)
          stream = res.stream
          objective.addExpression(res.expr)
          break
        default:
          now = stream.poll()
          if (now.getType() !== s)
            throw new Error(this.errorMsg(s, now, stream))
          break
      }
    }
    model.addObjective(objective)
    return model
  }

}




