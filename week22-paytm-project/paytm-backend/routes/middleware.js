import dotenv from "dotenv"
import jwt from "jsonwebtoken"

const authMiddleware=(req,res,next)=>{
    const token=req.headers.authorization;
    const data=req.body;
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    console.log(decoded);
    req.id=decoded
    next();
}

export{authMiddleware}