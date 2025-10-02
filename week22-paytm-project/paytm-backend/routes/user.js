import express from "express"
const router = express.Router();
import {PrismaClient} from "@prisma/client"
import * as z from "zod";
import jwt from "jsonwebtoken";
// require('dotenv').config()
import dotenv from "dotenv"
import { authMiddleware } from "./middleware.js";
// const secret = env("JWT_SECRET")



const prisma = new PrismaClient();

const userSchema = z.object({
    email:z.email().min(7),
    username:z.string().min(5),
    password:z.string().min(8)
})

const atSign = z.object({
    email:z.email(),
    password:z.string().min(8)
})

router.post('/signup',async(req,res)=>{
    try{

        const data = userSchema.parse(req.body);
        if(!data){
            res.json({
            message:"incorrect credentials pls chk and try again"
        })
        }
        // console.log(data)
        
        const isExist = await prisma.user.findFirst({
            where:{
                username:data.username
            }
        })
        
        if(isExist){
            console.log(isExist)
            res.json({
                message:"User already exist"
            })
        }
        let accNumber=0;
        while(accNumber===0){
            let random=Math.floor(10000 + Math.random() * 90000);
            const exist=await prisma.user.findUnique({
                where:{
                    accountNumber:random
                }
            })
            if(!exist)accNumber=random;
        }
        
        const userIs = await prisma.user.create({
            data:{
                username:data.username,
                accountNumber:accNumber,
                password:data.password,
                email:data.email
            }
        })
        if(userIs){
            await prisma.account.create({
               data:{ accountNumber:userIs.accountNumber,
                balance:100000
               }
            })
        }
        console.log(userIs)
        // console.log(secret)
        const token = jwt.sign(userIs.id,process.env.JWT_SECRET)
        res.json({
            messgae:"User created",
            token:token
        })
    }catch(err){
        // console.log(err);
        res.status(404).json({
            message:"Something went wrong "
        })
    }
})

router.post('/signin', async(req,res)=>{

    try{

        const data=atSign.parse(req.body);
        // console.log(data)
        if(!data){
            res.json({
                message:"incorrect credentials pls chk and try again"
            })
        }
            // console.log("before")
            const userExist = await prisma.user.findUnique({
                where:{
                    email:data.email
                }
            })
            // console.log("after")
            if(!userExist){
                res.json({
                    message:"user does not exist please signup"
                })
            }
            if(userExist.password===data.password){
                const token = jwt.sign(userExist.id,process.env.JWT_SECRET)
                res.json({
                    token:token
                })
            }
            else{
                res.json({
                    message:"incoreect passowrd"
                })
            }
            
            
        
    }catch(err){
        res.json({
            err:err
        })
    }
    
})


router.get("/details", authMiddleware,async(req,res)=>{
    // console.log("hellow");
    const id=req.id;
    const response = await prisma.user.findUnique({
        where:{
            id:id
        }
    })
    // console.log(response)
    const account = await prisma.account.findUnique({
        where:{
            accountNumber:response.accountNumber
        }
    })
    const allUser=await prisma.user.findMany({
        select:{
            username:true,
            accountNumber:true
        }
    })
    res.json({
        username:response.username,
        accountNumber:response.accountNumber,
        balance:account.balance,
        allUser:allUser
    })
})

export{router};