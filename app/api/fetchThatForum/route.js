import connectDB from "@/app/database/connection";
import Batch from "@/app/database/model/batchmodel";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const batchCode = searchParams.get('batchCode')

        connectDB();

        const getBatch = await Batch.findOne({ batchCode });
        const thatForum = getBatch.forum.filter((item) => {
            return item.id === id
        })
        if (thatForum.length === 0) {
            throw new Error('Forum Not Found!')
        }
        return NextResponse.json({ status: true, thisForum: thatForum[0] })

    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}