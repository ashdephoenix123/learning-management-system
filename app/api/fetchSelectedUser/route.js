import { NextResponse } from "next/server";
import User from "@/app/database/model/usermodel";
import Batch from "@/app/database/model/batchmodel";
import connectDB from "@/app/database/connection";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        await connectDB();
        // // fetch User and all its details
        const findUser = await User.findOne({ _id: id });
        const { fname, lname, image, batchCode } = findUser;

        const batchEnrolled = await Batch.findOne({ batchCode: batchCode });
        const { batchFullName } = batchEnrolled;

        return NextResponse.json({ status: true, user: { fname, lname, image, batchFullName } })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}

