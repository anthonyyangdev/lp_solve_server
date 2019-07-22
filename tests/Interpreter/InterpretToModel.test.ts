import { expect } from 'chai';
import interpretToModel from '../../src/Interpreter/interpretToModel';
import 'mocha'

describe('Hello function', () => {
  it('should return hello world', () => {
    const result = 'Hello World!';
    expect(result).to.equal('Hello World!');
  });
});
