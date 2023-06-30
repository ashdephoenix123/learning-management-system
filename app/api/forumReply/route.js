import { NextResponse } from "next/server"
import connectDB from "@/app/database/connection";
import Batch from "@/app/database/model/batchmodel";

export async function POST(request) {
    try {
        const { reply, email, batchCode, id } = await request.json();

        await connectDB();

        const thatForum = await Batch.updateOne({ batchCode, forum: { $elemMatch: { _id: id } } }, { $push: { 'forum.$.chats': { email, reply } } }).exec();

        if (thatForum.modifiedCount === 0) throw new Error('Error updating the Database!');

        return NextResponse.json({ status: true })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}

