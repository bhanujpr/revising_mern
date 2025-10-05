import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
// import dotenv from "dotenv"

export function middleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers.authorization
    console.log(token)
    //@ts-ignore
    const decoded = jwt.verify(token,JWT_SECRET)
    console.log(decoded)
    if(decoded){
        // @ts-ignore
        req.body.id=decoded;
        next();
    }else{
        res.status(403).json({
            message:"Unatuhorized login first"
        })
    }
}