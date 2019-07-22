var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
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
var Token = /** @class */ (function () {
    function Token(token) {
        this.value = token.value;
        this.regex = token.regex;
        this.type = token.type;
        this.literal = token.literal;
    }
    Token.prototype.getType = function () {
        return this.type;
    };
    Token.prototype.getRegex = function () {
        return this.regex;
    };
    Token.prototype.getValue = function () {
        return this.value;
    };
    Token.prototype.getLiteral = function () {
        return this.literal;
    };
    Token.prototype.clone = function () {
        return new Token({
            value: this.value,
            regex: this.regex,
            type: this.type,
            literal: this.literal
        });
    };
    return Token;
}());
var Tokenizer = /** @class */ (function () {
    function Tokenizer(input) {
        this.tokens = [];
        this.traverselPosition = 0;
        this.lineCount = 1;
        this.tokenPosition = 1;
        var currentString = new StringBuilder();
        var tokens = [];
        var position = 0;
        var blank = /\s/;
        function validate(currentString) {
            var validToken = Tokens.getPossibleToken(currentString.toString());
            if (validToken) {
                tokens[position++] = new Token(__assign({}, validToken, { literal: currentString.toString() }));
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
    /**
     * @returns {Token}
     */
    Tokenizer.prototype.poll = function () {
        var current = this.tokens[this.traverselPosition++];
        if (current.getType === Tokens.TYPES.SemiColon) {
            this.lineCount++;
            this.tokenPosition = 1;
        }
        else {
            this.tokenPosition++;
        }
        return this.tokens[this.traverselPosition++];
    };
    Tokenizer.prototype.hasNext = function () {
        return this.tokens[this.traverselPosition] !== undefined;
    };
    Tokenizer.prototype.clone = function () {
        return this.tokens.map(function (x) { return x.clone(); });
    };
    Tokenizer.prototype.getCurrentPosition = function () {
        return {
            line: this.lineCount,
            column: this.tokenPosition
        };
    };
    Tokenizer.getType = function (token) {
        return token.getType();
    };
    return Tokenizer;
}());
module.exports = Tokenizer;
