import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
export async function GET(req: NextRequest){


    // const headers = req.headers
    // const authHeader = headers["authorization"];
    // const decoded = jwt.decode(authHeader,"SECRET");
    // const userId=decoded.userID;
    return NextResponse.json({
        hello:"hhehehe"
    })
}