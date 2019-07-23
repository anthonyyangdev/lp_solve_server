import { expect } from 'chai';
import Eval from '../../src/Interpreter/Eval'
import Tokenizer from '../../src/Interpreter/Tokenizer/Tokenizer';
import 'mocha'

class Tester extends Eval {

  private tests = [
    {
      input: 'sum [i = 2 to 4] (x + 5);',
      expected: ['2', '4', 'x+5']
    }, {
      input: 'sum [i = 5 to 2x + 5 - 12y] (x + 5);',
      expected: ['5', '2x+5-12y', 'x+5']
    }, {
      input: 'sum [i = 5 to (2x + 5) - 12y] (x + 5);',
      expected: ['5', '2x+5-12y', 'x+5']
    },

  ]

  constructor() {
    super()
  }

  public runTest() {
    this.tests.forEach(x => {
      describe('Tokenizer', () => {
        it(`This parses the summation:\n${x.input}`, () => {
          const tokens = new Tokenizer(x.input);
          const expected = x.expected
          if (tokens.hasNext()) {
            const r = this.parseSum(tokens)
            expect(r.sumModel.getModelInfo().expr).to.deep.equal(expected)
          }
        });
      });
    })
  }
}

const Test = new Tester()
Test.runTest()

