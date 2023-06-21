import { NextResponse } from "next/server";
import connectDB from "@/app/database/connection";
import User from "@/app/database/model/usermodel";

export async function POST(request) {
    try {
        //for inbox
        const { email, _id } = await request.json();

        await connectDB();
        const result = await User.updateOne(
            { email: email },
            { $pull: { inbox: { _id: _id } } }
        );
        return NextResponse.json({ status: true })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}
