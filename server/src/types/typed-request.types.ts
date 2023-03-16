import {Query} from 'express-serve-static-core'
import {Request} from 'express'
import {TokenPayload} from './token-payload.types'

interface MyRequest extends Request {
  tokenPayload?: TokenPayload
}

export interface TypedRequest<T extends Query, U> extends MyRequest {
  body: U
  query: T
}

export interface TypedRequestBody<T> extends MyRequest {
  body: T
}

export interface TypedRequestQuery<T extends Query> extends MyRequest {
  query: T
}
