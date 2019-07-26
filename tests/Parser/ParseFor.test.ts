import { expect } from 'chai';
import Tokenizer from '../../src/Interpreter/Tokenizer/Tokenizer';
import 'mocha'
import Model from '../../src/Models/Model';
import ParserType from '../../src/Parser/ParserType';
import ForParser from '../../src/Parser/SpecificParsers/SpecificParserImpl'

class Tester {

  private tests = [
    {
      input: 'for i = 1 to 2: set x_i = 10;',
      expected: [
        {
          name: 'x_1', value: '10'
        }, {
          name: 'x_2', value: '10'
        }],
      loop: ['i']
    },
  ]

  public runTest() {
    this.tests.forEach(x => {
      describe('For Test', () => {
        it(`This should parse for statements in the input:\n${x.input}`, () => {
          const result = new Tokenizer(x.input);
          let model = new Model()
          const expected = x.expected
          const loop = x.loop
          if (result.hasNext()) {
            model = ForParser.parse(model, result, ParserType.For)
            const env = model.getEnvironment()
            for (const v of expected) {
              expect(env.exist(v.name)).to.equal(true)
              expect(env.get(v.name)).to.equal(v.value)
            }
            for (const i of loop) {
              expect(env.exist(i)).to.equal(false)
            }
          }
        });
      });
    })
  }
}

const Test = new Tester()
Test.runTest()