import { expect } from 'chai';
import Tokenizer from '../../src/Interpreter/Tokenizer/Tokenizer';
import 'mocha'
import Model from '../../src/Models/Model';
import ParserType from '../../src/Parser/ParserType';
import ForParser from '../../src/Parser/SpecificParsers/SpecificParserImpl'

class TesterSet {

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

class TesterInteger {

  private tests = [
    {
      input: 'for i = 1 to 2: int x_i;',
      expected: ['x_1', 'x_2'],
      loop: ['i']
    },
    {
      input: 'for i = 1 to 2: int x_i, y_i;',
      expected: ['x_1', 'x_2', 'y_1', 'y_2'],
      loop: ['i']
    }
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
            const int = model.getAllTypeDeclarations().int
            const env = model.getEnvironment()
            for (const v of expected) {
              expect(int.includes(v)).to.equal(true)
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

class TesterInnerFor {

  private tests = [
    {
      input: 'for i = 1 to 2: for t = 1 to 2: int x_it;',
      expected: ['x_11', 'x_12', 'x_21', 'x_22'],
      loop: ['i', 't']
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
            const int = model.getAllTypeDeclarations().int
            const env = model.getEnvironment()
            for (const v of expected) {
              expect(int.includes(v)).to.equal(true)
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

let Test: any = new TesterSet()
Test.runTest()

Test = new TesterInteger()
Test.runTest()

Test = new TesterInnerFor()
Test.runTest()
