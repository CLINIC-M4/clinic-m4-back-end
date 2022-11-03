import { NextFunction , Request, Response} from "express";

const verifyIsAdmMiddleware = async (req:Request, res:Response, next:NextFunction) =>{
  const {isAdm} = req.user
  if(!isAdm){
    return res.status(403).json({message:"You do not have permission"})
  }
  next()
}

export default verifyIsAdmMiddleware