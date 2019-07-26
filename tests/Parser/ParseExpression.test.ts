import { expect } from 'chai';
import Eval from '../../src/Interpreter/Eval'
import Tokenizer from '../../src/Interpreter/Tokenizer/Tokenizer';
import HelperParser from '../../src/Parser/ParserHelper/HelperParserImpl'
import 'mocha'
import Model from '../../src/Models/Model';
import ParserType from '../../src/Parser/ParserType';


class Tester {

  private tests = [
    {
      input: '2x + 5;',
      expected: '2x+5'
    }, {
      input: '2x+5;',
      expected: '2x+5'
    }, {
      input: '\n2\nx\n+\n5\n;\n',
      expected: '2x+5'
    }, {
      input: 'max2x+5;',
      expected: 'max2x+5'
    }, {
      input: '4max2x + 5;',
      expected: '4max2x+5'
    }, {
      input: 'x+5;',
      expected: 'x+5'
    }, {
      input: '12.x+5;',
      expected: '12.x+5'
    }, {
      input: '215x+5;',
      expected: '215x+5'
    }, {
      input: '215x+5 -120;',
      expected: '215x+5-120'
    }, {
      input: '30;',
      expected: '30'
    }, {
      input: '215 x_ij +5120;',
      expected: '215x_ij+5120'
    }, {
      input: 'x - 12;',
      expected: 'x-12'
    }, {
      input: 'z_t;',
      expected: 'z_t'
    }, {
      input: 'z_t + 5;',
      expected: 'z_t+5'
    }, {
      input: 'y_x + z_x ;',
      expected: 'y_x+z_x'
    },
  ]

  public runTest() {
    this.tests.forEach(x => {
      describe('Tokenizer', () => {
        it(`This should parse the entire expression of the input:\n${x.input}`, () => {
          const model = new Model()
          const result = new Tokenizer(x.input);
          const expected = x.expected
          if (result.hasNext()) {
            const r = HelperParser.parse(model.getEnvironment(), result, ParserType.Expression)
            expect(r).to.equal(expected)
          }
        });
      });
    })
  }
}

const Test = new Tester()
Test.runTest()

