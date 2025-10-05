import express from "express";
import * as z from "zod";
import jwt from "jsonwebtoken";
import cors from "cors"
// import dotenv from 'dotenv'
import { JWT_SECRET } from "@repo/backend-common/config";
import {
  SignUpSchema,
  SignInSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { middleware } from "./middleware";
import { prismaClient } from "@repo/db-common/client";


const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.post("/signup", async (req, res) => {

  try{

    const body = SignUpSchema.safeParse(req.body);
    if (!body.success) {
      res.status(403).json({
        hello: "Hello",
        data: req.body,
        message: "Incorrect credentials",
      });
    }
    if (body.data) {
      const response = await prismaClient.user.create({
      data: {
        email: body.data.email,
        username: body.data.username,
        password: body.data.password,
        name: body.data.name,
        photo: body.data.photo,
      },
    });
    res.status(200).json({
      message: "user created succesfull",
      data: body.data,
      response: response,
    });
  }
}catch(err){
  console.log(err)
  res.status(403).json({
    message:"Something went wrong",
    error:err
  })
}
});

app.post("/signin", async (req, res) => {
  const body = SignInSchema.safeParse(req.body);
  if (!body.success) {
    res.json({
      message: "Icorrect credentials",
    });
    return;
  }

  const isValidUser = await prismaClient.user.findUnique({
    where: {
      username: body.data?.username,
      password: body.data?.password,
    },
  });

  if (isValidUser) {
    const token = jwt.sign(isValidUser.id, JWT_SECRET);
    res.json({
      message: "You are logged in ",
      token: token,
    });
    return;
  }
  res.json({
    message: "Incorrect password or username",
  });
});

app.post("/room", middleware, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  console.log("here");
  if (!parsedData.success) {
    res.json({
      message: "Please enter room id",
    });
  }
  const userid = req.body.id;
  //@ts-ignore
//   console.log(req.id)
  console.log(userid)
  const response = await prismaClient.room.create({
    data: {
        //@ts-ignore
      slug: parsedData.data?.slug,
      adminId:userid
    },
  });

  res.json({
    message: "room created",
    data: response,
  });
});

app.get("/chats/:roomId",async (req,res)=>{
  const roomId = Number(req.params.roomId);
  const messages = await prismaClient.chat.findMany({
    where:{
      roomId:roomId
    },
    orderBy:{
      id:"desc"
    },
    take:50
  })
  res.json({
    messages:messages
  })
})

app.get("/chats/:slug",async (req,res)=>{
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where:{
      slug:slug
    }
  })
  res.json({
    room:room
  })
})


app.listen(3001);
