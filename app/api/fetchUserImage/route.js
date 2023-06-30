import { NextResponse } from "next/server";
import User from "@/app/database/model/usermodel";
import connectDB from "@/app/database/connection";

export async function POST(request) {
    try {
        const { email } = await request.json();
        await connectDB();
        const thatUser = await User.findOne({ email });

        return NextResponse.json({ status: true, userImage: thatUser.image })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}

