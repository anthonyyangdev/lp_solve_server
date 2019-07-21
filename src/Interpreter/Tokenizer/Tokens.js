const TYPES = {
  Statement: undefined,
  Expr: undefined,
  Misc: undefined,
  SemiColon: undefined,
  Character: undefined,
  Colon: undefined,
  Number: undefined,
  Math: undefined
}

const keys = Object.keys(TYPES)
for (let i = 0; i < keys.length; i++) {
  TYPES[keys[i]] = i + 1
}

const TOKENS = {
  maximize: {
    value: 'max',
    regex: /maximize/,
    type: TYPES.Statement
  },
  minimize: {
    value: 'min',
    regex: /minimize/,
    type: TYPES.Statement
  },
  max: {
    value: 'max',
    regex: /max/,
    type: TYPES.Statement
  },
  min: {
    value: 'min',
    regex: /min/,
    type: TYPES.Statement
  },
  for: {
    value: 'for',
    regex: /for/,
    type: TYPES.Statement
  },
  to: {
    value: 'to',
    regex: /to/,
    type: TYPES.Statement
  },
  sum: {
    value: 'sum',
    regex: /sum/,
    type: TYPES.Expr
  },
  number: {
    value: 'number',
    regex: /\d/,
    type: TYPES.Character
  },
  point: {
    value: 'point',
    regex: /\./,
    type: TYPES.Character
  },
  word: {
    value: 'word',
    regex: /\w/,
    type: TYPES.Character
  },
  plus: {
    value: 'plus',
    regex: /\+/,
    type: TYPES.Math
  },
  minus: {
    value: 'minus',
    regex: /\-/,
    type: TYPES.Math
  },
  LTE: {
    value: 'less-than-equal',
    regex: /<=/
  },
  GTE: {
    value: 'greater-than-equal',
    regex: />=/
  },
  LT: {
    value: 'less-than',
    regex: /</
  },
  GT: {
    value: 'greater-than-equal',
    regex: />/
  },
  equal: {
    value: 'equal',
    regex: /=/
  },
  left_paren: {
    value: 'left-paren',
    regex: /\(/,
    type: TYPES.Misc,
  },
  right_paren: {
    value: 'right-paren',
    regex: /\)/,
    type: TYPES.Misc
  },
  left_bracket: {
    value: 'left-bracket',
    regex: /\[/,
    type: TYPES.Misc
  },
  right_bracket: {
    value: 'right-bracket',
    regex: /\]/,
    type: TYPES.Misc
  },
  semi_colon: {
    value: 'semi-colon',
    regex: /\;/,
    type: TYPES.SemiColon
  },
  colon: {
    value: 'colon',
    regex: /\:/,
    type: TYPES.Colon
  }
}

const CHAR_TOKEN = {
  relation: {
    value: 'relation',
    regex: /[><]/
  },
  letter: {
    value: 'letter',
    regex: /[a-z_A-Z]/,
    type: TYPES.Character
  },
  word_number: {
    value: 'word',
    regex: /\w|\./,
    type: TYPES.Character
  },
  number: {
    value: 'number',
    regex: /\d/,
    type: TYPES.Character
  },
  underscore: {
    value: 'underscore',
    regex: /\_/,
    type: TYPES.Character
  },
}

const NUMBER_TOKEN = {
  number: {
    value: 'number',
    regex: /\d/,
    type: TYPES.Number
  },
  point: {
    value: 'point',
    regex: /\./,
    type: TYPES.Number
  }
}

const ExceptionTokens = {
}

function tokenException(total, current, next) {

  // If it is <= or >=
  const currentIsRelationHead = CHAR_TOKEN.relation.regex.test(current)
  const nextIsEqual = /\=/.test(next)
  if (currentIsRelationHead && nextIsEqual)
    return true

  // If is forms a coefficient of a variable
  const prevIsNumber = /\d|\s*/.test(total)
  const currentIsNumber = /\d/.test(total)
  const nextIsLetter = CHAR_TOKEN.letter.regex.test(next)
  if (prevIsNumber && currentIsNumber && nextIsLetter)
    return false

  // If it possibly forms a word/keyword
  const currentIsWordNum = CHAR_TOKEN.word_number.regex.test(current)
  const nextIsWordNum = CHAR_TOKEN.word_number.regex.test(next)
  return currentIsWordNum && nextIsWordNum
}

function getPossibleToken(input) {
  for (const c in TOKENS) {
    if (TOKENS[c].regex.test(input))
      return TOKENS[c]
  }
  return false
}

module.exports = {
  tokenException,
  getPossibleToken,
  ...TOKENS
}