var IterationModel = /** @class */ (function () {
    function IterationModel() {
    }
    IterationModel.prototype.isDefined = function (self) {
        if (self !== undefined)
            throw new Error('The For Model overloaded.');
    };
    IterationModel.prototype.addVariable = function (variable) {
        this.isDefined(this.variable_name);
        this.variable_name = variable;
    };
    IterationModel.prototype.addValue = function (value) {
        if (this.start === undefined) {
            this.start = value;
        }
        else if (this.end === undefined) {
            this.end = value;
        }
        else {
            throw new Error('The Sum Model overloaded.');
        }
    };
    IterationModel.prototype.addExpr = function (expr) {
        this.isDefined(this.expression);
        this.expression = expr;
    };
    IterationModel.prototype.getModelInfo = function () {
        return {
            variable: this.variable_name,
            start: this.start,
            end: this.end,
            expr: this.expression
        };
    };
    return IterationModel;
}());

module.exports = IterationModel;
