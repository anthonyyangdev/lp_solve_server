
type opType = 'max' | 'min' | undefined
type _obj = '_obj'

type LpSolveModel = {
  optimize: _obj,
  opType: opType,
  constraints: {},
  variables: {},
  ints: {},
  binaries: {},
  unrestricted: {}
};

export default LpSolveModel