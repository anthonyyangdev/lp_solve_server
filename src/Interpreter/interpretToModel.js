const Model = require('../Model/model')
const eval = require('./eval')
/**
 * 
 * @param {string[]} content 
 */
function interpretToModel(content) {
  let model = new Model()
  for (let i = 0; i < content.length; i++) {
    const currentLine = content[i]
    model = eval(currentLine, model)
  }
}

module.exports = interpretToModel