import InterpretToModel from '../../src/Interpreter/InterpretToModel';
import lpsolve from '../../src/Solver/lpsolve'
import 'mocha'

describe('Interpret to Model', () => {
  const input = `max: 2x + 6;
  \nc1: 2x <= 12;
  \nc2: 2y >= 23;
  \nc3: 0 <= x + y <= 100;
  \nset z = 4;
  \nfor i = 2 to 4: x_i <= z + z;`
  it('Inteprets into a model', () => {
    const result = InterpretToModel(input)
    console.log(result.getObjective())
    console.log(result.getConstraint())
    console.log(result.getEnvironment())
    console.log(result.getAllTypeDeclarations())
    const _ = lpsolve(result)
  });
});
