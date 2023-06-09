import { NextResponse } from "next/server"
import connectDB from "@/app/database/connection";
import Batch from "@/app/database/model/batchmodel";

export async function GET(request) {
    try {
        await connectDB();
        const batch = await Batch.find({});
        return NextResponse.json({ status: true, batch })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}


export async function POST(request) {
    try {
        await connectDB();
        const { batchCode, batchShortName, batchFullName, intake, coursecode, announcements, inbox, semester } = await request.json();
        const findBatch = await Batch.findOne({ batchCode })
        if(findBatch) throw new Error('Batch already exists!');
        const newBatch = new Batch({  batchCode, batchShortName, batchFullName, intake, coursecode, announcements, inbox, semester });
        await newBatch.save();

        return NextResponse.json({ status: true })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}

