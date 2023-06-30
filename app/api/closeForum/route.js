import { NextResponse } from "next/server"
import connectDB from "@/app/database/connection";
import Batch from "@/app/database/model/batchmodel";

export const dynamic = 'force-dynamic';


export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const batchCode = searchParams.get('batchCode');
        const id = searchParams.get('id');
        await connectDB();
        const thatForum = await Batch.updateOne({ batchCode, forum: { $elemMatch: { _id: id } } }, { $set: { "forum.$.isOpen": false } }).exec();

        if (thatForum.modifiedCount === 0) throw new Error('Error updating the Database!');

        return NextResponse.json({ status: true })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}
