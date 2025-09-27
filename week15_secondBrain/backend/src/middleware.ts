import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET="hellobhai";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const token=req.headers.authorization;
    console.log(`token is ${token}`)
    if (!token) {
    return res.status(401).json({
      message: "Token missing, please log in",
    });
  }
    const decoded = jwt.verify(token as string,JWT_SECRET)
    if(decoded){
        // @ts-ignore
        req.userId=decoded.id;
        // @ts-ignore
        next()
    }
    else{
        res.status(403).json({
            message:"You are not logged in"
        })
    }
};
