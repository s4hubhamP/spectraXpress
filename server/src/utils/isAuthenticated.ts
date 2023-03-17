import {NextFunction, Response} from 'express-serve-static-core'
import jwt from 'jsonwebtoken'
import {TypedRequest} from '../types/typed-request.types'
import {check} from './check'

export function isAuthenticated(req: TypedRequest<any, any>, response: Response, next: NextFunction) {
  check(process.env.JWT_SECRET, 'JWT_SECRET not set in environment')
  check(req.headers.authorization, 'Authorization header not present')

  try {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
  } catch (error) {
    return response.status(401).json({message: 'Unauthorized'})
  }

  return next()
}
