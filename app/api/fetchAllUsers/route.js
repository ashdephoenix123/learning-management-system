import { NextResponse } from "next/server"
import connectDB from "@/app/database/connection";
import User from "@/app/database/model/usermodel";

export async function GET(request) {
    try {
        await connectDB();
        const users = await User.find({});
        return NextResponse.json({ status: true, users  })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}