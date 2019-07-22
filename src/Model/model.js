module.exports = function Model() {
  return {
    optimize: '_obj',
    objective: {
      opType: undefined,
      expression: undefined
    },
    constraints: {},
    env: {},
    constraintCount: 0
  }
}