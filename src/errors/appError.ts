import { Response } from "express";

export class appError extends Error {
  statusCode

  constructor(statusCode: number, message: string){
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

export const handlerError = (err:appError, res:Response)=>{
  const {statusCode, message} = err

  return res.status(statusCode).json({
    status:"error test",
    statusCode,
    message
  })
}