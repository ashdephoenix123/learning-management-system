import { NextResponse } from "next/server";
import connectDB from "@/app/database/connection";
import Batch from "@/app/database/model/batchmodel";
import User from "@/app/database/model/usermodel";

export async function POST(request) {
    try {
        //for inbox
        const { from, subject, message, batchCode } = await request.json();
        if(!batchCode) throw new Error('Batch code is required');

        await connectDB();
        const updateBatchInbox = Batch.updateOne({ batchCode }, { $push: { inbox: { from, subject, message } } }).exec();
        const updateUserInbox = User.updateMany({ batchCode }, { $push: { inbox: { from, subject, message } } }).exec();

        await Promise.all([updateBatchInbox, updateUserInbox]);

        return NextResponse.json({ status: true })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}