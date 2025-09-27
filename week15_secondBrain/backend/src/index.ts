import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import * as z from "zod";
import { contentModel, linkModel, userModel } from "./db.js";
import { userMiddleware } from "./middleware.js";
import { generateRandomHash } from "./utils.js";
import { link } from "fs";
const JWT_SECRET="hellobhai";
import cors from "cors"

mongoose.connect("mongodb+srv://bhanurajawatt:Bhanu2003@cluster0.8gtn7kw.mongodb.net/brainly")

const app=express();
app.use(express.json())
app.use(cors())


app.post("/api/v1/signup", async (req, res) => {
    console.log(req.body);
    // Zod validation
    const reqData = z.object({
        username: z.string(),
        password: z.string()
    });

    const validData = reqData.safeParse(req.body);
    if (!validData.success) {
        return res.json({ message: "Incorrect credentials" });
    }
    try {
        console.log("creating")
        const existingUser = await userModel.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(411).json({ message: "User already exists" });
        }

        const newUser = await userModel.create({
            username: req.body.username,
            password: req.body.password
        });
        res.status(200).json({ message: "You are signed up" });

    } catch (err) {
        console.log("Error during signup:", err);
        res.status(500).json({ message: "Server error" });
    }
});



app.post("/api/v1/signin", async (req,res)=>{
    const reqData=z.object({
        username:z.string(),
        password:z.string()
    })
    // console.log(req.body)
    const validData= reqData.safeParse(req.body);
    if(!validData.success){
        res.json({
            message:"Incorrect credentials"
        })
    }
    const username=req.body.username
    const password=req.body.password
    const existingUser= await userModel.findOne({
        username,
        password
    })
    // console.log(existingUser)
    if(existingUser){
        //console.log(existingUser._id)
        const token = jwt.sign({id:existingUser._id},JWT_SECRET);
        console.log(token)
        res.status(200).json({
            "token":token
        })
    }else{
        res.status(403).json({
            "message":"wrong cred"
        })
    }
    
})


app.post("/api/v1/content",userMiddleware, async(req,res)=>{
    const link = req.body.link
    const type=req.body.type
    const title=req.body.title
    console.log(req.body)
    
    const isThere = await contentModel.findOne({
        //@ts-ignore
        userId:req.userId,
        title:title
    })
    if(isThere){
        res.json({
            message:"title already exist"
        })
        return 
    }

    await contentModel.create({
        link,
        type,
        title,
        //@ts-ignore
        userId:req.userId,
        tags:[]
    })
    res.json({
        message:"Content added"
    })
    
})


app.get("/api/v1/content",userMiddleware,async(req,res)=>{
    //@ts-ignore
    const userId=req.userId
    const content = await contentModel.find({
        userId:userId
    }).populate("userId","username ")
    res.json({
        content
    })
})



app.delete("/api/v1/content",userMiddleware, async(req,res)=>{
    const title=req.body.title
    //@ts-ignore
    const userId=req.userId
    const deletedContent = await contentModel.deleteMany({
        userId:userId,
        title:title
    })
    res.json({
        deleted:deletedContent,
        message:"work is done"
    })

})


app.post("/api/v1/brain/share",userMiddleware,async(req,res)=>{
    const share=req.body.share;
    //@ts-ignore
    const userId=req.userId
    const exist=await linkModel.findOne({
        userId:userId,
    })
    if(exist&&share){
        const hash=exist.hash
        res.json({
            message:"user already exist",
            sharedlink:hash
        })
        return 
    }
    const hash=generateRandomHash(12);
   // console.log(hash)
    if(share){
        await linkModel.create({
            userId:userId,
            hash:hash
        })
        res.json({
            message:"share enabled",
            hash:hash
        })
    }else{
            await linkModel.deleteOne({
            userId:userId
        })
        res.json({
            message:"share disabled"
        })
    }
})


app.get("/api/v1/brain/:shareLink",async(req,res)=>{
    const hash=req.params.shareLink
    const link = await linkModel.findOne({
        hash:hash
    })
    if(!link){
        res.status(411).json({
            message:"invalid share link you are fooled"
        })
        return
    }

    const userId=link.userId
    console.log(userId)
    const content = await contentModel.find({
        userId:userId.toString()
    })
    const user=await userModel.findOne({
        _id:link.userId.toString()
    })

    res.json({
        user:user?.username,
        content:content
    })
    
})


app.listen(3000);