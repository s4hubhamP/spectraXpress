import express from 'express'

export const catchAsync = (callback: Function) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    callback(req, res, next).catch(next)
  }
}
