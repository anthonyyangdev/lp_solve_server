var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var StringBuilder = require('../StringBuilder/StringBuilder');
var Tokens = require('./Tokens');
var Tokenizer = /** @class */ (function () {
  function Tokenizer(input) {
    this.tokens = [];
    this.traverselPosition = 0;
    var currentString = new StringBuilder();
    var tokens = [];
    var position = 0;
    var blank = /\s/;
    function validate(currentString) {
      var validToken = Tokens.getPossibleToken(currentString.toString());
      if (validToken) {
        tokens[position++] = __assign({}, validToken, { literal: currentString.toString() });
      }
      currentString.clear();
    }
    for (var i = 0; i < input.length; i++) {
      var value = input[i];
      if (blank.test(value)) {
        continue;
      }
      currentString.append(value);
      if (Tokens.tokenException(currentString.toString(), value, input[i + 1])) {
        continue;
      }
      validate(currentString);
    }
    if (currentString.size() > 0)
      validate(currentString);
    this.tokens = tokens;
  }
  Tokenizer.prototype.peek = function () {
    if (this.traverselPosition === this.tokens.length) {
      throw new Error('There are no more tokens.');
    }
    return this.tokens[this.traverselPosition];
  };
  Tokenizer.prototype.poll = function () {
    return this.tokens[this.traverselPosition++];
  };
  Tokenizer.prototype.hasNext = function () {
    return this.tokens[this.traverselPosition] !== undefined;
  };
  return Tokenizer;
}());
module.exports = Tokenizer;
