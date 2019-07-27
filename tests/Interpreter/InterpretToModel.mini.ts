import InterpretToModel from '../../src/Interpreter/InterpretToModel';
import 'mocha'

describe('Interpret to Model', () => {
  const input = 'max: 2x + y;\nc1: 2x <= 12;\nc2: 2y <= 23;\nc3: 0 <= x + y <= 100;\nint x, y, z;\nbin a, b, c;'
  it('Inteprets into a model', () => {
    const result = InterpretToModel(input)
    console.log(result.getConstraint())
    // expect(result).to.equal('Hello World!');
  });
});
