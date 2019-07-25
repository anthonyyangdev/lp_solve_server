import { expect } from 'chai';
import TYPES from '../../src/Interpreter/Tokenizer/TokenType'
import Tokenizer from '../../src/Interpreter/Tokenizer/Tokenizer';
import 'mocha'
import Model from '../../src/Models/Model';
import ParserType from '../../src/Parser/ParserType';
import VariableParser from '../../src/Parser/ParserHelper/HelperParserImpl'

class Tester {

  private tests = [
    {
      input: 'max: 2x + 5;',
      expected: ['x']
    }, {
      input: 'max:2x+5;',
      expected: ['x']
    }, {
      input: 'max\n:\n2\nx\n+\n5\n;\n',
      expected: ['x']
    }, {
      input: 'max2x+5;',
      expected: ['max2x']
    }, {
      input: 'max: 4max2x + 5;',
      expected: ['max2x']
    }, {
      input: 'max x+5;',
      expected: ['x']
    }, {
      input: 'max ...x+5;',
      expected: ['x']
    }, {
      input: 'max 215x+5;',
      expected: ['x']
    }, {
      input: 'fen: 215x+5 <= 120;',
      expected: ['fen', 'x']
    }, {
      input: 'fen: 30 <= 215x+5 <= 120;',
      expected: ['fen', 'x']
    }, {
      input: 'sum [i = 12 to 43] (30 <= 215x_ij+5 <= 120);',
      expected: ['i', 'x_ij']
    }, {
      input: 'set x = 12;',
      expected: ['x']
    }, {
      input: 'set x = sum [t = 1 to 5] (z_t);',
      expected: ['x', 't', 'z_t']
    }, {
      input: 'for x = 1 to 5: y_x + z_x = 12',
      expected: ['x', 'y_x', 'z_x']
    },
  ]

  public runTest() {
    this.tests.forEach(x => {
      describe('Tokenizer', () => {
        it(`This should parse the variables in the input:\n${x.input}`, () => {
          const result = new Tokenizer(x.input);
          const model = new Model()
          const expected = x.expected
          let index = 0
          while (result.hasNext() && result.peek().getType() !== TYPES.SemiColon) {
            const token = result.peek()
            const env = model.getEnvironment()
            if (token.getType() === TYPES.Word) {
              const actual = VariableParser.parse(env, result, ParserType.Variable)
              expect(actual).to.equal(expected[index++]);
            } else {
              result.pop()
            }
          }
        });
      });
    })
  }
}

const Test = new Tester()
Test.runTest()

