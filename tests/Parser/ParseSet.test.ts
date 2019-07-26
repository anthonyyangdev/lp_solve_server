import { expect } from 'chai';
import Eval from '../../src/Interpreter/Eval'
import Tokenizer from '../../src/Interpreter/Tokenizer/Tokenizer';
import 'mocha'
import Model from '../../src/Models/Model';
import ParserType from '../../src/Parser/ParserType';
import SetParser from '../../src/Parser/SpecificParsers/SpecificParserImpl'
import TYPES from '../../src/Interpreter/Tokenizer/TokenType';

class Tester {

  private tests = [
    {
      input: 'set x = 10;',
      expectedName: 'x',
      expectedValue: '10',
    }, {
      input: 'set x1 = 10.;',
      expectedName: 'x1',
      expectedValue: '10.',
    }, {
      input: 'set tr = x + 5;',
      expectedName: 'tr',
      expectedValue: 'x+5',
    }, {
      input: 'set x_ij = .12;',
      expectedName: 'x_ij',
      expectedValue: '.12',
    }, {
      input: 'set x_ij_p = 1.;',
      expectedName: 'x_ij_p',
      expectedValue: '1.',
    }
  ]

  public runTest() {
    this.tests.forEach(x => {
      describe('Tokenizer', () => {
        it(`This should parse the numbers in the input:\n${x.input}`, () => {
          const result = new Tokenizer(x.input);
          let model = new Model()
          const name = x.expectedName
          const value = x.expectedValue
          const env = model.getEnvironment()
          if (result.hasNext()) {
            model = SetParser.parse(model, result, ParserType.Set)
            expect(env.exist(name)).to.equal(true)
            expect(env.get(name)).to.equal(value)
          }
        });
      });
    })
  }
}

const Test = new Tester()
Test.runTest()

class ExtendedSetTester extends Eval {
  private tests = [
    {
      input: 'set x = 10, y = 12, z = 3;',
      expected: [
        { name: 'x', value: '10' },
        { name: 'y', value: '12' },
        { name: 'z', value: '3' }
      ],
    }, {
      input: 'set x = x + 1, y = 12, z = 3;',
      expected: [
        { name: 'x', value: 'x+1' },
        { name: 'y', value: '12' },
        { name: 'z', value: '3' }
      ],
    }, {
      input: 'set x = x - 1, y = -12, z = 3;',
      expected: [
        { name: 'x', value: 'x-1' },
        { name: 'y', value: '-12' },
        { name: 'z', value: '3' }
      ],
    }
  ]

  constructor() {
    super()
  }

  public runTest() {
    this.tests.forEach(x => {
      describe('Set Test', () => {
        it(`This should parse the set statements in the input:\n${x.input}`, () => {
          const result = new Tokenizer(x.input);
          let model = new Model()
          const expected = x.expected
          if (result.hasNext() && result.peek().getType() === TYPES.Set) {
            model = SetParser.parse(model, result, ParserType.Set)
            const env = model.getEnvironment()
            for (const o of expected) {
              expect(env.exist(o.name)).to.equal(true)
              expect(env.get(o.name)).to.equal(o.value)
            }
          }
        });
      });
    })
  }
}

const ExtendedTest = new ExtendedSetTester()
ExtendedTest.runTest()
