import BaseResponse from '../Errors/BaseResponse'
import BadRequest from '../Errors/BadRequest'
import NotFound from '../Errors/NotFound'
import Forbidden from '../Errors/Forbidden'
import Unauthorized from '../Errors/Unauthorized'
import InternalServer from '../Errors/InternalServer'

const ResponseError = {
  BaseResponse,
  BadRequest,
  NotFound,
  Forbidden,
  Unauthorized,
  InternalServer,
}

export default ResponseError
