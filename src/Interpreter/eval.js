const Tokenizer = require('./Tokenizer/Tokenizer')

function getType(line) {

}

function parseToken(current, model) {

}

/**
 * @param {string} line 
 * @param {Model} model 
 * @returns {Model}
 */
function eval(line, model) {
  let TOKENS = new Tokenizer(line)
  while (TOKENS.hasNext()) {
    const current = TOKENS.poll()
    TOKENS = parseToken(current, model)
  }
}


module.exports = eval