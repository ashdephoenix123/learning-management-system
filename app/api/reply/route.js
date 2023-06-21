import { NextResponse } from "next/server";
import connectDB from "@/app/database/connection";
import User from "@/app/database/model/usermodel";

export async function POST(request) {
    try {
        //for inbox
        const { to, sender, message, _id, recipientID } = await request.json();
        if (!to || !sender) throw new Error('User Email is required');

        await connectDB();

        const updateRecipientInbox = await User.updateOne(
            { inbox: { $elemMatch: { _id: recipientID } } },
            { $push: { 'inbox.$.replies': { sender, body: message } }, $set: { 'inbox.$.isRead': false } }
        ).exec();

        if (updateRecipientInbox.modifiedCount === 0) throw new Error('Message not sent! The Conversation might have been deleted by the recipient. Please start a new conversation from your inbox.');

        const updateSenderInbox = await User.updateOne(
            { inbox: { $elemMatch: { _id: _id } } },
            { $push: { 'inbox.$.replies': { sender, body: message } } }
        ).exec();

        if (updateSenderInbox.modifiedCount === 0) throw new Error('Message not sent! The Conversation might have been deleted by the Sender. Please start a new conversation from your inbox.');

        return NextResponse.json({ status: true })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}