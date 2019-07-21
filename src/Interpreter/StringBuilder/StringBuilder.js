var StringBuilder = /** @class */ (function () {
    function StringBuilder() {
        this.pointer = 0;
        this.string_array = [];
    }
    StringBuilder.prototype.append = function (char) {
        for (var i = 0; i < char.length; i++) {
            this.string_array[this.pointer] = char[i];
            this.pointer++;
        }
    };
    StringBuilder.prototype.toString = function () {
        return this.string_array.join('');
    };
    StringBuilder.prototype.clear = function () {
        this.pointer = 0;
        this.string_array = [];
    };
    StringBuilder.prototype.size = function () {
        return this.pointer;
    };
    return StringBuilder;
}());
module.exports = StringBuilder;
