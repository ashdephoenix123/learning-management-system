import { NextResponse } from "next/server";
import connectDB from "@/app/database/connection";
import User from "@/app/database/model/usermodel";

export async function POST(request) {
    try {
        //for inbox
        const { selectedCheckboxes, email } = await request.json();
        console.log(selectedCheckboxes)

        await connectDB();
        await User.updateOne(
            { email, 'inbox._id': { $in: selectedCheckboxes } },
            { $pull: { inbox: { _id: { $in: selectedCheckboxes } } } }
        )

        return NextResponse.json({ status: true })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}
