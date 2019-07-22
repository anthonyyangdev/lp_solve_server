import removeComments from './RemoveComments'
import toArray from './ToArray/toArray'
import interpretToModel from './Interpreter/interpretToModel'

function getModelFromContent(content: string) {

  /* This will be replaced soon with the new parser, thus, 
  we do not need to convert it into an array. */
  removeComments(content)
  const contentArray = toArray(content)
  return interpretToModel(contentArray)
}

export default getModelFromContent