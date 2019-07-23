import Tokenizer from './Tokenizer/Tokenizer'
import TokenType from './Tokenizer/TokenType'
import IterationModel from '../Model/IterationModel'
import StringBuilder from '../StringBuilder/StringBuilder'
import Token from './Tokenizer/Token'
import Model from '../Model/Model'
import SetModel from '../Model/SetModel';
import ObjectiveModel from '../Model/ObjectiveModel';
import TypeDeclareModel from '../Model/TypeDeclareModel';

class Eval {
  /**
   * @param {Token} expected 
   * @param {Token} actual
   * @param {Tokenizer} stream 
   */
  private errorMsg(expected: TokenType, actual: Token, stream: Tokenizer) {
    const positions = stream.getCurrentPosition()
    const actualLiteral = actual.getLiteral()
    const row = positions.line
    const col = positions.column
    return `Expected ${expected} but encountered ${actualLiteral} at line ${row}, word ${col}`
  }

  protected parseNumber(current: Token) {
    const number = current.getLiteral().trim()
    const regex = /^(([0-9]*\.[0-9]+)|([0-9]+\.?))$/
    if (regex.test(number)) {
      return number
    }
    else
      throw new SyntaxError(`The number ${number} is not valid.`)
  }

  /**
   * @param {Token} current 
   */
  protected parseVariable(current: Token) {
    const word = current.getLiteral().trim()
    const regex = /[a-zA-Z]\w*/
    if (regex.test(word)) {
      return word
    }
    else
      throw new SyntaxError(`The variable name ${word} is not valid.`)
  }

  private parseOperator(current: Token) {
    const operator = current.getLiteral().trim()
    const regex = /[+-]/
    if (regex.test(operator)) {
      return operator
    }
    else
      throw new SyntaxError(`The operator ${operator} is not valid.`)
  }

  protected parseExpression(stream: Tokenizer) {
    let builder = new StringBuilder()
    let end = false
    while (!end && stream.hasNext()) {
      let current = stream.peek()
      const type = current.getType()
      switch (type) {
        case TokenType.Word:
          const word = this.parseVariable(current)
          builder.append(word)
          break
        case TokenType.Number:
          const number = this.parseNumber(current)
          builder.append(number)
          break
        case TokenType.MathOperator:
          const operator = this.parseOperator(current)
          builder.append(operator)
          break
        case TokenType.Sum:
          const result = this.parseSum(stream)
          builder.append(result.expr)
          stream = result.stream
          break
        case TokenType.LPAREN:
          stream.pop()
          const inner = this.parseExpression(stream)
          builder.append(inner.expr)
          stream = inner.stream
          break
        case TokenType.RPAREN:
        default:
          end = true
      }
      if (!end) {
        stream.pop()
      }
    }

    const expr = builder.toString()
    return {
      expr,
      stream
    }
  }

  /**
   * 
   * @param {Tokenizer} TOKEN_STREAM
   * @param {string}
   */
  protected parseSum(TOKEN_STREAM: Tokenizer) {
    const expected = [
      TokenType.Sum,
      TokenType.LBRACKET,
      TokenType.Word,
      TokenType.Equal,
      TokenType.Expr,
      TokenType.To,
      TokenType.Expr,
      TokenType.RBRACKET,
      TokenType.LPAREN,
      TokenType.Expr,
      TokenType.RPAREN,
    ]

    let sumModel = new IterationModel()
    let expr = ''
    for (const s of expected) {
      if (!TOKEN_STREAM.hasNext())
        throw new Error('There are no more tokens.')
      let now = undefined
      switch (s) {
        case TokenType.Word:
          now = TOKEN_STREAM.poll()
          const word = this.parseVariable(now)
          sumModel.addVariable(word)
          break
        case TokenType.Expr:
          const { expr, stream } = this.parseExpression(TOKEN_STREAM)
          sumModel.addExpr(expr)
          TOKEN_STREAM = stream
          break
        default:
          now = TOKEN_STREAM.poll()
          if (now.getType() !== s)
            throw new Error(this.errorMsg(s, now, TOKEN_STREAM))
          break
      }
    }

    // Transform sum model into an expression
    return {
      expr,
      stream: TOKEN_STREAM,
      sumModel
    }

  }

  protected parseSet(stream: Tokenizer, model: Model) {
    const expected = [
      TokenType.Set,
      TokenType.Word,
      TokenType.Equal,
      TokenType.Expr,
    ]

    const variable = new SetModel()

    for (const s of expected) {
      if (!stream.hasNext())
        throw new Error('There are no more tokens.')
      let now = undefined
      switch (s) {
        case TokenType.Word:
          now = stream.poll()
          const word = this.parseVariable(now)
          variable.addName(word)
          break
        case TokenType.Expr:
          const res = this.parseExpression(stream)
          stream = res.stream
          variable.addValue(res.expr)
          break
        default:
          now = stream.poll()
          if (now.getType() !== s)
            throw new Error(this.errorMsg(s, now, stream))
          break
      }
    }

    model.addSetVariable(variable)
    return model
  }

  /**
   * @test Needs Testing
   * @param stream 
   * @param model 
   */
  protected parseObjective(stream: Tokenizer, model: Model) {
    const expected = [
      TokenType.Objective,
      TokenType.SemiColon,
      TokenType.Colon,
      TokenType.Expr,
    ]

    const objective = new ObjectiveModel()
    for (const s of expected) {
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

  protected parseTypeDeclaration(stream: Tokenizer, model: Model) {

    const typeDeclareModel = new TypeDeclareModel()

    const possibleType = stream.poll()
    if (possibleType.getType() === TokenType.VariableType) {
      typeDeclareModel.addType(possibleType.getLiteral())
    } else {
      throw new Error(`Was expecting a type declaration but received ${possibleType.getType()} instead.`)
    }

    const possibleValue = stream.poll()
    if (possibleValue.getType() === TokenType.Word) {
      const word = this.parseVariable(possibleType)
      typeDeclareModel.addVariable(word)
    } else {
      throw new Error(`Was expecting a variable name but received ${possibleType.getType()} instead.`)
    }

    const expected = [
      TokenType.Comma,
      TokenType.Word
    ]
    while (stream.peek().getType() !== TokenType.SemiColon) {
      for (const s of expected) {
        if (!stream.hasNext())
          throw new Error('There are no more tokens.')
        let now = undefined
        switch (s) {
          case TokenType.Word:
            now = stream.poll()
            const name = this.parseVariable(now)
            typeDeclareModel.addVariable(name)
            break
          default:
            now = stream.poll()
            if (now.getType() !== s)
              throw new Error(this.errorMsg(s, now, stream))
            break
        }
      }
    }

    model.addTypeDeclaration(typeDeclareModel)
    return model
  }

  private parseToken(current: Token, model: Model, TOKEN_STREAM: Tokenizer) {
    const current_type = current.getType()
    switch (current_type) {
      case TokenType.Sum:
        const { expr, stream } = this.parseSum(TOKEN_STREAM)
        TOKEN_STREAM = stream
        // Do something with expression and add to model
        break
      case TokenType.Set:
        model = this.parseSet(TOKEN_STREAM, model)
        break
      case TokenType.Objective:
        model = this.parseObjective(TOKEN_STREAM, model)
        break
      case TokenType.VariableType:
        model = this.parseTypeDeclaration(TOKEN_STREAM, model)
        break
    }
    return {
      model,
      TOKEN_STREAM
    }
  }


  /**
   * @param {string} line 
   * @param {Model} model 
   * @returns {Model}
   */
  public eval(line: string, model: Model) {
    let TOKEN_STREAM = new Tokenizer(line)
    while (TOKEN_STREAM.hasNext()) {
      const current = TOKEN_STREAM.peek()
      const result = this.parseToken(current, model, TOKEN_STREAM)
      model = result.model
      TOKEN_STREAM = result.TOKEN_STREAM
    }
    return model
  }
}

export default Eval