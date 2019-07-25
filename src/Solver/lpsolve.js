"use strict";
exports.__esModule = true;
var solve = require('javascript-lp-solver');
function lpsolve(model) {
    return solve.Solve(model);
}
exports["default"] = lpsolve;
