var SumModel = /** @class */ (function () {
  function SumModel() {
  }
  SumModel.prototype.addVariable = function (variable) {
    if (this.start_variable === undefined)
      this.start_variable = variable;
    else
      throw new Error('The Sum Model overloaded.');
  };
  SumModel.prototype.addValue = function (value) {
    if (this.start_value === undefined) {
      this.start_value = value;
    }
    else if (this.end_value === undefined) {
      this.end_value = value;
    }
    else {
      throw new Error('The Sum Model overloaded.');
    }
  };
  SumModel.prototype.addExpr = function (expr) {
    if (this.expression === undefined)
      this.expression = expr;
    else
      throw new Error('The Sum Model overloaded.');
  };
  SumModel.prototype.getModelInfo = function () {
    return {
      variable: this.start_variable,
      start: this.start_value,
      end: this.end_value,
      expr: this.expression
    };
  };
  return SumModel;
}());

module.exports = SumModel
