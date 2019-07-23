import TYPES from './TokenType'

const TOKENS: any = {
  maximize: {
    value: 'max',
    regex: /^maximize$/,
    type: TYPES.Objective
  },
  minimize: {
    value: 'min',
    regex: /^minimize$/,
    type: TYPES.Objective
  },
  max: {
    value: 'max',
    regex: /^max$/,
    type: TYPES.Objective
  },
  min: {
    value: 'min',
    regex: /^min$/,
    type: TYPES.Objective
  },
  for: {
    value: 'for',
    regex: /^for$/,
    type: TYPES.For
  },
  to: {
    value: 'to',
    regex: /^to$/,
    type: TYPES.To
  },
  sum: {
    value: 'sum',
    regex: /^sum$/,
    type: TYPES.Sum
  },
  set: {
    value: 'set',
    regex: /^set$/,
    type: TYPES.Set
  },
  int: {
    value: 'int',
    regex: /^int$/,
    type: TYPES.VariableType
  },
  free: {
    value: 'free',
    regex: /^free$/,
    type: TYPES.VariableType
  },
  bin: {
    value: 'bin',
    regex: /^bin$/,
    type: TYPES.VariableType
  },
  number: {
    value: 'number',
    regex: /^([0-9]|\.)*$/,
    type: TYPES.Number
  },
  word: {
    value: 'word',
    regex: /\w/,
    type: TYPES.Word
  },
  plus: {
    value: 'plus',
    regex: /^\+$/,
    type: TYPES.MathOperator
  },
  minus: {
    value: 'minus',
    regex: /^\-$/,
    type: TYPES.MathOperator
  },
  LTE: {
    value: 'less-than-equal',
    regex: /^<=$/,
    type: TYPES.LTE
  },
  GTE: {
    value: 'greater-than-equal',
    regex: /^>=$/,
    type: TYPES.GTE
  },
  LT: {
    value: 'less-than',
    regex: /^<$/,
    type: TYPES.LT
  },
  GT: {
    value: 'greater-than-equal',
    regex: /^>$/,
    type: TYPES.GTE
  },
  equal: {
    value: 'equal',
    regex: /^=$/,
    type: TYPES.Equal
  },
  left_paren: {
    value: 'left-paren',
    regex: /^\($/,
    type: TYPES.LPAREN,
  },
  right_paren: {
    value: 'right-paren',
    regex: /^\)$/,
    type: TYPES.RPAREN
  },
  left_bracket: {
    value: 'left-bracket',
    regex: /^\[$/,
    type: TYPES.LBRACKET
  },
  right_bracket: {
    value: 'right-bracket',
    regex: /^\]$/,
    type: TYPES.RBRACKET
  },
  semi_colon: {
    value: 'semi-colon',
    regex: /^\;$/,
    type: TYPES.SemiColon
  },
  colon: {
    value: 'colon',
    regex: /^\:$/,
    type: TYPES.Colon
  }
}

const CHAR_TOKEN: any = {
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

function tokenException(total: string, current: string, next: string) {
  // console.table([total, current, next])
  // If it is <= or >=
  const currentIsRelationHead = /[><]/.test(current)
  const nextIsEqual = /\=/.test(next)
  if (currentIsRelationHead && nextIsEqual)
    return true

  // If is forms a coefficient of a variable
  const prevIsNumber = /^([0-9]|\.)*$/.test(total)
  const currentIsNumber = /[0-9]|\./.test(current)
  const nextIsNumber = /[0-9]|\./.test(next)
  if (prevIsNumber && currentIsNumber)
    return nextIsNumber

  // If it possibly forms a word/keyword
  const currentIsWordNum = /\w/.test(current)
  const nextIsWordNum = /\w/.test(next)
  return currentIsWordNum && nextIsWordNum
}

function getPossibleToken(input: string) {
  for (const c in TOKENS) {
    if (TOKENS[c].regex.test(input))
      return TOKENS[c]
  }
  return null
}

export default {
  tokenException,
  getPossibleToken,
}