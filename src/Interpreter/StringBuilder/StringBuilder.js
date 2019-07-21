
function StringBuilder() {
  var pointer = 0
  var string_array = []

  function append(char) {
    for (let i = 0; i < char.length; i++) {
      string_array[pointer] = char[i]
      pointer++
    }
  }

  function toString() {
    return string_array.join('')
  }

  function clear() {
    pointer = 0
    string_array = []
  }

  function size() {
    return pointer
  }

  return {
    append,
    toString,
    clear,
    size
  }
}

module.exports = StringBuilder