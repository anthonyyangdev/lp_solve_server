// const Tokenizer = require('./Tokenizer/Tokenizer')
// const TYPES = require('./Tokenizer/Tokens').TYPES
// const IterationModel = require('../Model/IterationModel')
// const StringBuilder = require('./StringBuilder/StringBuilder')

// /**
//  * @param {Token} expected 
//  * @param {Token} actual
//  * @param {Tokenizer} stream 
//  */
// const errorMsg = (expected, actual, stream) => {
//   const row = stream.line
//   const col = stream.column
//   return `Expected ${expected} but encountered ${actual} at line ${row}, word ${col}`
// }

// /**
//  * @param {Token} current 
//  */
// function parseVariable(current) {
//   const word = current.getLiteral().trim()
//   const regex = /[a-zA-Z]\w*/
//   if (regex.test(word)) {
//     return word
//   }
//   else
//     throw new SyntaxError(`Variable name ${word} is not valid.`)
// }

// function parseExpression(current, stream) {
//   const allowed_tokens = {
//     [TYPES.Word]: 1,
//     [TYPES.Number]: 1,
//     [TYPES.MathOperator]: 1,
//     [TYPES.Sum]: 1
//   }

//   const builder = new StringBuilder()
//   switch (current) {
//     case TYPES.Word:
//       const word = parseVariable(current)
//       builder.append(word)
//       break
//     case TYPES.Number:
//       const number = parseNumber(current)
//       builder.append(number)
//       break
//     case TYPES.MathOperator:
//       const operator = parseOperator(current)
//       builder.append(operator)
//     case TYPES.Sum:
//       const expression = parseExpression(current, stream)

//   }
//   while (stream.hasNext()) {
//     const
//   }
// }

// /**
//  * 
//  * @param {Tokenizer} TOKEN_STREAM
//  * @param {string}
//  */
// function parseSum(TOKEN_STREAM) {
//   const expected = [
//     TYPES.LBRACKET,
//     TYPES.Word,
//     TYPES.Equal,
//     TYPES.Expr,
//     TYPES.To,
//     TYPES.Expr,
//     TYPES.RBRACKET,
//     TYPES.LPAREN,
//     TYPES.Expr,
//     TYPES.RPAREN,
//   ]

//   let sumModel = new IterationModel()
//   for (const s of expected) {
//     if (!TOKEN_STREAM.hasNext())
//       throw new Error('There are no more tokens.')

//     const now = TOKEN_STREAM.poll()
//     switch (s) {
//       case TYPES.Word:
//         const word = parseVariable(now)
//         sumModel.addVariable(word)
//         break
//       case TYPES.Expr:
//         const { expr, stream } = parseExpression(now, TOKEN_STREAM)
//         sumModel.addExpr(expr)
//         TOKEN_STREAM = stream
//         break
//       default:
//         if (now.getType() !== s)
//           throw new Error(errorMsg(s, now.getLiteral(), TOKEN_STREAM))
//         break
//     }

//   }

// }


// /**
//  * 
//  * @param {Token} current 
//  * @param {*} model 
//  * @param {Tokenizer} TOKEN_STREAM 
//  */
// function parseToken(current, model, TOKEN_STREAM) {
//   const current_type = current.getType()
//   switch (current_type) {
//     case TYPES.Sum:
//       const expression = parseSum(TOKEN_STREAM)
//   }
// }


// /**
//  * @param {string} line 
//  * @param {Model} model 
//  * @returns {Model}
//  */
// function eval(line, model) {
//   let TOKEN_STREAM = new Tokenizer(line)
//   while (TOKEN_STREAM.hasNext()) {
//     const current = TOKEN_STREAM.poll()
//     const result = parseToken(current, model, TOKEN_STREAM)
//     model = result.model
//     TOKEN_STREAM = result.TOKEN_STREAM
//   }
// }


// module.exports = eval