import "dotenv/config"
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

const ensureAuthMiddleware = async(req:Request, res:Response, next:NextFunction)=>{
  let token = req.headers.authorization

  if(!token){
    return res.status(401).json({
      message: 'Missing authorization Token'
    })}

  token = token.split(' ')[1]

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded:any)=>{
    if(error){
       return res.status(401).json({message: error.message})
     }
    req.user = {
      isAdm: decoded.isAdm,
       id: decoded.id,
      isActive:decoded.isActive
     }
    next()
    })
}

export default ensureAuthMiddleware 