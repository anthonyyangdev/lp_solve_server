import { expect } from 'chai';
import Eval from '../../src/Interpreter/Eval'
import TYPES from '../../src/Interpreter/Tokenizer/TokenType'
import Tokenizer from '../../src/Interpreter/Tokenizer/Tokenizer';
import 'mocha'


class Tester extends Eval {

  private tests = [
    {
      input: 'max: 2x + 5;',
      expected: ['2', '5']
    }, {
      input: 'max:2x+5;',
      expected: ['2', '5']
    }, {
      input: 'max\n:\n2\nx\n+\n5\n;\n',
      expected: ['2', '5']
    }, {
      input: 'max2x+5;',
      expected: ['5']
    }, {
      input: 'max: 4max2x + 5;',
      expected: ['4', '5']
    }, {
      input: 'max x+5;',
      expected: ['5']
    }, {
      input: 'max 12.x+5;',
      expected: ['12.', '5']
    }, {
      input: 'max 215x+5;',
      expected: ['215', '5']
    }, {
      input: 'fen: 215x+5 <= 120;',
      expected: ['215', '5', '120']
    }, {
      input: 'fen: 30 <= 215x+5 <= 120;',
      expected: ['30', '215', '5', '120']
    }, {
      input: 'sum [i = 12 to 43] (30 <= 215x_ij+5 <= 120);',
      expected: ['12', '43', '30', '215', '5', '120']
    }, {
      input: 'set x = 12;',
      expected: ['12']
    }, {
      input: 'set x = sum [t = 1 to 5] (z_t);',
      expected: ['1', '5']
    }, {
      input: 'for x = 1 to 5: y_x + z_x = 12',
      expected: ['1', '5', '12']
    },
  ]

  constructor() {
    super()
  }

  public runTest() {
    this.tests.forEach(x => {
      describe('Tokenizer', () => {
        it(`This should parse the numbers in the input:\n${x.input}`, () => {
          const result = new Tokenizer(x.input);
          const expected = x.expected
          let index = 0
          while (result.hasNext()) {
            const token = result.poll()
            if (token.getType() === TYPES.Number)
              expect(this.parseNumber(token)).to.equal(expected[index++]);
          }
        });
      });
    })
  }
}

const Test = new Tester()
Test.runTest()

