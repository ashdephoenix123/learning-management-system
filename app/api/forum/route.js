import { NextResponse } from "next/server"
import connectDB from "@/app/database/connection";
import Batch from "@/app/database/model/batchmodel";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const batchCode = searchParams.get('batchCode');
        await connectDB();
        const findBatch = await Batch.findOne({ batchCode });

        return NextResponse.json({ status: true, allForums: findBatch.forum.sort((a, b) => b.createdAt - a.createdAt) })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}


export async function POST(request) {
    try {
        const { title, description, batchCode, email } = await request.json();
        await connectDB();

        await Batch.updateOne({ batchCode }, { $push: { forum: { title, description, openedBy: email } } })

        return NextResponse.json({ status: true })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}

