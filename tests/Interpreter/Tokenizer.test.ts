import { expect } from 'chai';
import Tokenizer from '../../src/Interpreter/Tokenizer/Tokenizer';
import 'mocha'

const tests = [
  {
    input: 'max: 2x + 5;',
    expected: ['max', ':', '2', 'x', '+', '5', ';']
  }, {
    input: 'max:2x+5;',
    expected: ['max', ':', '2', 'x', '+', '5', ';']
  }, {
    input: 'max\n:\n2\nx\n+\n5\n;\n',
    expected: ['max', ':', '2', 'x', '+', '5', ';']
  }, {
    input: 'max2x+5;',
    expected: ['max2x', '+', '5', ';']
  }, {
    input: 'max: 4max2x + 5;',
    expected: ['max', ':', '4', 'max2x', '+', '5', ';']
  }, {
    input: 'max x+5;',
    expected: ['max', 'x', '+', '5', ';']
  }, {
    input: 'max ...x+5;',
    expected: ['max', '...', 'x', '+', '5', ';']
  }, {
    input: 'max 215x+5;',
    expected: ['max', '215', 'x', '+', '5', ';']
  }, {
    input: 'fen: 215x+5 <= 120;',
    expected: ['fen', ':', '215', 'x', '+', '5', '<=', '120', ';']
  }, {
    input: 'fen: 30 <= 215x+5 <= 120;',
    expected: ['fen', ':', '30', '<=', '215', 'x', '+', '5', '<=', '120', ';']
  }, {
    input: 'sum [i = 12 to 43] (30 <= 215x_ij+5 <= 120);',
    expected: ['sum', '[', 'i', '=', '12', 'to', '43', ']', '(', '30', '<=', '215', 'x_ij', '+', '5', '<=', '120', ')', ';']
  }, {
    input: 'set x = 12;',
    expected: ['set', 'x', '=', '12', ';']
  }, {
    input: 'set x = sum [t = 1 to 5] (z_t);',
    expected: ['set', 'x', '=', 'sum', '[', 't', '=', '1', 'to', '5', ']', '(', 'z_t', ')', ';']
  }, {
    input: 'for x = 1 to 5: y_x + z_x = 12',
    expected: ['for', 'x', '=', '1', 'to', '5', ':', 'y_x', '+', 'z_x', '=', '12']
  },
]

tests.forEach(x => {
  describe('Tokenizer', () => {
    it(`This should tokenize the input:\n${x.input}`, () => {
      const result = new Tokenizer(x.input);
      const expected = x.expected
      let index = 0
      while (result.hasNext()) {
        expect(result.poll().getLiteral()).to.equal(expected[index++]);
      }
    });
  });
})
