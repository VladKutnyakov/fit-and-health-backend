import { Request, Response } from "express"

const responseHandler = (req: Request, res: Response, status: number, data: any): Response => {
  return res.status(status).json({
    updatedToken: req.body.updatedToken,
    res: data
  })
}

export {
  responseHandler
}
