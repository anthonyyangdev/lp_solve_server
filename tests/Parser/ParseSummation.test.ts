import { expect } from 'chai';
import Tokenizer from '../../src/Interpreter/Tokenizer/Tokenizer';
import 'mocha'
import Model from '../../src/Models/Model';
import ParserType from '../../src/Parser/ParserType';
import SumParser from '../../src/Parser/ParserHelper/HelperParserImpl'
import TYPES from '../../src/Interpreter/Tokenizer/TokenType';

class Tester {

  private tests = [
    {
      input: 'sum [i = 2 to 4] (x + 5);',
      expected: 'x+5'
    }, {
      input: 'sum [i = 2 to 4] (t_i + 5);',
      expected: 't_2+5+t_3+5+t_4+5'
    }, {
      input: 'sum [i = 5 to 7] (x_i);',
      expected: 'x_5+x_6+x_7'
    },

  ]

  public runTest() {
    this.tests.forEach(x => {
      describe('Tokenizer', () => {
        it(`This parses the summation:\n${x.input}`, () => {
          const tokens = new Tokenizer(x.input);
          const model = new Model()
          const env = model.getEnvironment()
          const expected = x.expected
          if (tokens.hasNext() && tokens.peek().getType() !== TYPES.SemiColon) {
            const r = SumParser.parse(env, tokens, ParserType.Sum)
            expect(r).to.deep.equal(expected)
          } else {
            tokens.pop()
          }
        });
      });
    })
  }
}

const Test = new Tester()
Test.runTest()

