import ParserInterface from './ParserInterface'
import ParserType from './ParserType'
import Model from 'src/Models/Model';

class ParserImpl implements ParserInterface {

  private Parser: Object = {
  }

  parse(model: Model, type: ParserType): Model {
    throw new Error('Not implemented')
  }

}

export default ParserImpl