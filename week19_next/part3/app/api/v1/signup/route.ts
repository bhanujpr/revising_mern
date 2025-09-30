import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@/app/generated/prisma";
import  prismaClient  from "../../../db/index";

export async function POST(req:NextRequest){
    const data = await req.json();
    console.log(data)
    await prismaClient.user.create({
        data:{
            username:data.username,
            password:data.password
        }
    })
    return NextResponse.json({
        message:"You have been signed up"
    })
}