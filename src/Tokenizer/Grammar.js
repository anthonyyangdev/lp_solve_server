
function makeGRAMMAR() {
  this.arithmetic = [
    {
      literal: /\+|\-/,
    }
  ]

  this.integer = [{
    literal: /[0-9]+/
  }]

  this.float = [{
    literal: /[0-9]\.[0-9]* | [0-9]*\.[0-9]+/
  }]

  this.letter = [{
    literal: /[a-zA-Z]/
  }]

  this.word = [{
    literal: /[a-zA-Z_0-9]/
  }]

  this.less_than = [{
    literal: /\<\=|\</
  }]

  this.greater_than = [{
    literal: /\>\=|\>/
  }]

  this.equal = [{
    literal: /\=/
  }]

  this.subscript = [{
    literal: /\_/
  }, {
    letter: this.letter
  }, {
    any: [{
      word: this.word
    }]
  }]

  this.variable = [{
    letter: this.letter
  }, {
    any: [{
      word: this.word
    }]
  }, {
    optional: [{
      subscript: this.subscript
    }]
  }]

  this.relation = [{
    less_than: this.less_than,
    greater_than: this.greater_than,
    equal: this.equal
  }]







  this.statement = [
    {
      for: this.for,
      objective: this.objective,
      constraint: this.constraint,
      set: this.set,
    },
    {
      literal: /\;/
    }
  ]

  this.for = [{
    literal: /for/
  }, {
    iteration_assign: this.iteration_assign
  }, {
    optional: [{
      iteration_assign: this.iteration_assign
    }]
  }, {
    literal: /\:/
  }, {
    statement: this.statement
  }
  ]

  this.iteration_assign = [{
    variable: this.variable
  }, {
    literal: /\=/
  }, {
    variable: this.variable,
    number: this.number
  }, {
    literal: /to/
  }, {
    variable: this.variable,
    number: this.number
  }]

  this.objective = [{
    literal: /(max|min)(imize)?\ *\:/,
  }, {
    expression: this.expression
  }]

  this.constraint = [{
    optional: [{
      name: this.name
    }, {
      literal: /\:/
    }]
  }, {
    relation_constraint: this.relation_constraint,
    range_constraint: this.range_constraint
  }]

  this.name = [{
    letter: this.letter
  }, {
    any: [{
      word: this.word
    }]
  }, {
    literal: /\:/
  }]

  this.set = [
    {
      literal: /set/
    }, {
      assign: this.assign
    }, {
      any: [
        {
          literal: /\,/
        }, {
          assign: this.assign
        }
      ]
    }
  ]

  this.assign = [
    {
      variable:
        this.variable
    },
    {
      literal: /\=/
    },
    { expression: this.expression }
  ]

  this.expression = [{
    any: [{
      arithmetic: this.arithmetic
    }]
  }, {
    sum: this.sum,
    sequence: [
      this.term,
      this.arithmetic,
      this.expression,
    ],
    term: this.term
  }]

  this.sum = [{
    literal: /sum\s*\[/
  }, {
    iteration_assign: this.iteration_assign
  }, {
    literal: /\s*\]\(/
  }, {
    expression: this.expression
  }, {
    literal: /\)/
  }]

  this.term = [{
    number: this.number
  }, {
    optional: [{
      variable: this.variable
    }]
  }]

  this.number = [{
    integer: this.integer,
    float: this.float
  }]

  this.relation_constraint = [{
    expression: this.expression
  }, {
    relation: this.relation
  }, {
    expression: this.expression
  }]

  this.range_constraint = [{
    increasing: this.increasing
  }, {
    decreasing: this.decreasing
  }]

  this.increasing = [{
    expression: this.expression
  }, {
    less_than: this.less_than
  }, {
    expression: this.expression
  }, {
    less_than: this.less_than
  }, {
    expression: this.expression
  }]

  this.decreasing = [{
    expression: this.expression
  }, {
    greater_than: this.greater_than
  }, {
    expression: this.expression
  }, {
    greater_than: this.greater_than
  }, {
    expression: this.expression
  }]

  return {
    arithmetic: this.arithmetic,
    float: this.float,
    integer: this.integer,
    letter: this.letter,
    word: this.word,
    subscript: this.subscript,
    variable: this.variable,
    relation: this.relation
  }
}

const GRAMMAR = makeGRAMMAR()

console.log(GRAMMAR)