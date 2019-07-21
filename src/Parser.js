const removeComments = require('./RemoveComments')
const Tokenize = require('./Tokenizer/Tokenize')




function getModelFromContent(content) {
  removeComments(content)

  if (typeof content === 'string') {
    content = Tokenize(content)
  }
  if (!Array.isArray(content)) {
    throw new TypeError('content !== array: The given content is not an array or was not properlly split into one.')
  }

}


module.exports = getModelFromContent