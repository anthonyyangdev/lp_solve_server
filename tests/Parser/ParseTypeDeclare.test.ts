import { expect } from 'chai';
import Tokenizer from '../../src/Interpreter/Tokenizer/Tokenizer';
import 'mocha'
import Model from '../../src/Models/Model';
import ParserType from '../../src/Parser/ParserType';
import Parser from '../../src/Parser/SpecificParsers/SpecificParserImpl'

class Tester {

  private tests: {
    input: string
    expected: {
      int: string[],
      bin: string[],
      free: string[]
    }
  }[] = [
      {
        input: 'int x;',
        expected: { int: ['x'], free: [], bin: [] },
      }, {
        input: 'int x1, x2, x3;',
        expected: { int: ['x1', 'x2', 'x3'], free: [], bin: [] },
      }, {
        input: 'free x;',
        expected: { int: [], free: ['x'], bin: [] },
      }, {
        input: 'free x, y, z;',
        expected: { int: [], free: ['x', 'y', 'z'], bin: [] },
      }, {
        input: 'bin a;',
        expected: { int: [], free: [], bin: ['a'] },
      }, {
        input: 'bin a, b, c;',
        expected: { int: [], free: [], bin: ['a', 'b', 'c'] },
      }
    ]

  public runTest() {
    this.tests.forEach(x => {
      describe('Type Declare', () => {
        it(`This should parse the type declarations in the input:\n${x.input}`, () => {
          const result = new Tokenizer(x.input);
          let model = new Model()
          const variables = x.expected
          if (result.hasNext()) {
            model = Parser.parse(model, result, ParserType.TypeDeclare)
            const env = model.getAllTypeDeclarations()
            for (const t in variables) {
              let actual: string[] = []
              let expected: string[] = []
              switch (t) {
                case 'int':
                  actual = env.int
                  expected = variables.int
                  break
                case 'free':
                  actual = env.free
                  expected = variables.free
                  break
                case 'bin':
                  actual = env.bin
                  expected = variables.bin
                  break
              }
              for (const v of expected) {
                expect(actual.includes(v)).to.equal(true)
              }
              for (const v of actual) {
                expect(expected.includes(v)).to.equal(true)
              }
            }
          }
        });
      });
    })
  }
}

const Test = new Tester()
Test.runTest()