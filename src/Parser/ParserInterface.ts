import Model from '../Models/Model'
import ParserType from './ParserType'

interface ParserInterface {

  parse(model: Model, type: ParserType): Model;

}

export default ParserInterface