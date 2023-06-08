import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(request) {
    try {
        const userInfo = await request.json();        
        const checkToken = jwt.verify(userInfo.token, process.env.JWT_SECRET);
        if(!checkToken || checkToken.email !== userInfo.email) throw new Error("Something went wrong, Please Re-login!");
        return NextResponse.json({ status: true })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}