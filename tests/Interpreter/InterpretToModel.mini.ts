import InterpretToModel from '../../src/Interpreter/InterpretToModel';
import 'mocha'

describe('Interpret to Model', () => {
  const input = 'max: 2x + y;\nint x, y, z;\nbin a, b, c;'
  it('Inteprets into a model', () => {
    const result = InterpretToModel(input)
    console.log(result)
    // expect(result).to.equal('Hello World!');
  });
});
