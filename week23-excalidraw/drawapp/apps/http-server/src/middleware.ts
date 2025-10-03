import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
// import dotenv from "dotenv"

export function middleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers.authorization
    //@ts-ignore
    const decoded = jwt.verify(token,JWT_SECRET)

    if(decoded){
        //@ts-ignore
        req.id=decoded.id;
    }else{
        res.status(403).json({
            message:"Unatuhorized login first"
        })
    }
}