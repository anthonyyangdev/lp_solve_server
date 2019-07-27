import InterpretToModel from '../../src/Interpreter/InterpretToModel';
import 'mocha'

describe('Interpret to Model', () => {
  const input = 'int x, y, z;\nbin a, b, c;'
  it('Inteprets into a model', () => {
    const result = InterpretToModel(input)
    console.log(result)
    // expect(result).to.equal('Hello World!');
  });
});
