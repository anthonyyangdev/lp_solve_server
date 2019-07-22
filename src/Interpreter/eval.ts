import _Tokenizer = require('./Tokenizer/Tokenizer')
type Tokenizer = _Tokenizer.default
const Tokenizer = _Tokenizer.default

import _Tokens = require('./Tokenizer/Tokens')
const Tokens = _Tokens.default
const TYPES = Tokens.TYPES

import _IterationModel = require('../Model/IterationModel')
type IterationModel = _IterationModel.default
const IterationModel = _IterationModel.default

import _StringBuilder = require('./StringBuilder/StringBuilder')
type StringBuilder = _StringBuilder.default
const StringBuilder = _StringBuilder.default

import _Token = require('./Tokenizer/Token')
type Token = _Token.default
const Token = _Token.default

import _Model = require('../Model/Model')
type Model = _Model.default
const Model = _Model.default

class Eval {

  /**
   * @param {Token} expected 
   * @param {Token} actual
   * @param {Tokenizer} stream 
   */
  private errorMsg(expected: Token, actual: Token, stream: Tokenizer) {
    const positions = stream.getCurrentPosition()
    const actualLiteral = actual.getLiteral()
    const row = positions.line
    const col = positions.column
    return `Expected ${expected} but encountered ${actualLiteral} at line ${row}, word ${col}`
  }

  private parseNumber(current: Token) {
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
  private parseVariable(current: Token) {
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

  private parseExpression(current: Token, stream: Tokenizer) {
    let builder = new StringBuilder()

    const parse = (current: Token, builder: StringBuilder, stream: Tokenizer) => {
      switch (current) {
        case TYPES.Word:
          const word = this.parseVariable(current)
          builder.append(word)
          break
        case TYPES.Number:
          const number = this.parseNumber(current)
          builder.append(number)
          break
        case TYPES.MathOperator:
          const operator = this.parseOperator(current)
          builder.append(operator)
          break
        case TYPES.Sum:
          const result = this.parseExpression(current, stream)
          builder.append(result.expr)
          stream = result.stream
          break
        default:
          throw new Error(`Found a invalid term in what was expected to be an expression: ${current}`)
      }
      return {
        builder,
        stream
      }
    }

    let result = parse(current, builder, stream)
    builder = result.builder
    stream = result.stream

    while (stream.hasNext()) {
      current = stream.poll()
      result = parse(current, builder, stream)
      builder = result.builder
      stream = result.stream
    }

    return {
      expr: builder.toString(),
      stream
    }
  }

  /**
   * 
   * @param {Tokenizer} TOKEN_STREAM
   * @param {string}
   */
  private parseSum(TOKEN_STREAM: Tokenizer) {
    const expected = [
      TYPES.LBRACKET,
      TYPES.Word,
      TYPES.Equal,
      TYPES.Expr,
      TYPES.To,
      TYPES.Expr,
      TYPES.RBRACKET,
      TYPES.LPAREN,
      TYPES.Expr,
      TYPES.RPAREN,
    ]

    let sumModel = new IterationModel()
    let expr = ''
    for (const s of expected) {
      if (!TOKEN_STREAM.hasNext())
        throw new Error('There are no more tokens.')
      const now = TOKEN_STREAM.poll()
      switch (s) {
        case TYPES.Word:
          const word = this.parseVariable(now)
          sumModel.addVariable(word)
          break
        case TYPES.Expr:
          const { expr, stream } = this.parseExpression(now, TOKEN_STREAM)
          sumModel.addExpr(expr)
          TOKEN_STREAM = stream
          break
        default:
          if (now.getType() !== s)
            throw new Error(this.errorMsg(s, now, TOKEN_STREAM))
          break
      }
    }

    // Transform sum model into an expression

    return {
      expr,
      stream: TOKEN_STREAM
    }

  }


  /**
   * @param {Token} current 
   * @param {*} model 
   * @param {Tokenizer} TOKEN_STREAM 
   */
  private parseToken(current: Token, model: Model, TOKEN_STREAM: Tokenizer) {
    const current_type = current.getType()

    switch (current_type) {
      case TYPES.Sum:
        const { expr, stream } = this.parseSum(TOKEN_STREAM)
        TOKEN_STREAM = stream
        // Do something with expression and add to model
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
      const current = TOKEN_STREAM.poll()
      const result = this.parseToken(current, model, TOKEN_STREAM)
      model = result.model
      TOKEN_STREAM = result.TOKEN_STREAM
    }
    model
  }
}

export default Eval