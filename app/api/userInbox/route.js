import { NextResponse } from "next/server";
import connectDB from "@/app/database/connection";
import User from "@/app/database/model/usermodel";

// export async function POST(request) {
//     try {
//         //for inbox
//         const { from, subject, message, email } = await request.json();
//         if (!email) throw new Error('User Email is required');

//         await connectDB();
//         await User.updateOne({ email }, { $push: { inbox: { from, subject, message } } });

//         return NextResponse.json({ status: true })
//     } catch (error) {
//         return NextResponse.json({ status: false, error: error.message })
//     }
// }

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        await connectDB();
        const user = await User.findOne({ email: searchParams.get('email') });

        return NextResponse.json({ status: true, userInbox: user.inbox.sort((a, b) => b.date - a.date) })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}