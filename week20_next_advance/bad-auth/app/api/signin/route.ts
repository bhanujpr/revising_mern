import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    //ideally we should check the username and password in db and only if its right return the jwt
      
    const body = await req.json();
    console.log(body)
    const username= body.username;
    const password = body.password;

    
    const userId=5;

    const token = jwt.sign({
            userId
        },"SECRET")

    return NextResponse.json({
        token
    })

}