const removeComments = require('./RemoveComments')
const toArray = require('./ToArray/toArray')
const interpretToModel = require('./Interpreter/interpretToModel');

function getModelFromContent(content) {
  removeComments(content)
  if (typeof content === 'string') {
    content = toArray(content)
  }
  if (!Array.isArray(content)) {
    throw new TypeError('content !== array: The given content is not an array or was not properlly split into one.')
  }

  return interpretToModel(content)
}

module.exports = getModelFromContent