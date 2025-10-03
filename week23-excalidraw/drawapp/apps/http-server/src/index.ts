import  express  from "express";
import * as z from 'zod';
import jwt from "jsonwebtoken"
// import dotenv from 'dotenv'
import { JWT_SECRET } from "@repo/backend-common/config";
import {SignUpSchema, SignInSchema, CreateRoomSchema} from "@repo/common/types";
import { middleware } from "./middleware";
import {prismaClient} from "@repo/db-common/client"

const app = express();
app.use(express.json())



app.post('/signup',async(req,res)=>{
    console.log(req.body)
    const body = SignUpSchema.safeParse(req.body);
    console.log(body)
    if(!body.success){
        res.json({
            hello:"Hello",
            data:req.body,
            message:"Incorrect credentials"
        })
    }
    if(body.data){

        const response = await prismaClient.user.create({
            data:{
                email:body.data.email,
                username:body.data.username,
                password:body.data.password,
                name:body.data.name,    
                photo:body.data.photo,
            }
        })
        res.json({
            message:"user created succesfull",
            data:body.data,
            response:response
        })
    }
})

app.post('/signin',async(req,res)=>{
    const body = SignInSchema.safeParse(req.body);
    if(!body.success){
        res.json({
            message:"Icorrect credentials"
        })
        return
    }

    const isValidUser= await prismaClient.user.findUnique({
        where:{
            username:body.data?.username,
            password:body.data?.password
        }
    })

    if(isValidUser){
        const token = jwt.sign("hahah",JWT_SECRET)
        res.json({
            message:"You are logged in ",
            token:token
        })
        return
    }
    res.json({
        message:"Incorrect password or username"
    })


})


app.post('/room',middleware,(req,res)=>{

})



app.listen(3001);