import { NextResponse } from "next/server";
import connectDB from "@/app/database/connection";
import User from "@/app/database/model/usermodel";

export async function POST(request) {
    try {
        //for inbox
        const { eachInbox } = await request.json();
        await connectDB();

        const user = await User.findOneAndUpdate(
            { email: eachInbox.to, "inbox._id": eachInbox._id },
            { $set: { "inbox.$.isRead": true } },
            { new: true }
        );
        
        return NextResponse.json({ status: true })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}
