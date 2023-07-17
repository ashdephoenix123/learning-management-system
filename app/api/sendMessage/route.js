import { NextResponse } from "next/server";
import connectDB from "@/app/database/connection";
import User from "@/app/database/model/usermodel";

export async function POST(request) {
    try {
        //for inbox
        const { to, from, subject, message } = await request.json();
        if (!to) throw new Error('User Email is required');

        await connectDB();
        const updateRecipientInbox = await User.findOneAndUpdate(
            { email: to },
            { $push: { inbox: { from, to, subject, message } } },
            { new: true }
        );

        const updateSenderInbox = await User.findOneAndUpdate(
            { email: from },
            { $push: { inbox: { from, to, subject, message, isIncoming: false, isRead: true, recipientID: updateRecipientInbox.inbox[updateRecipientInbox.inbox.length - 1].id } } },
            { new: true }
        );
        const updateRecipientInboxAgain = await User.findOneAndUpdate(
            { email: to, 'inbox._id': updateRecipientInbox.inbox[updateRecipientInbox.inbox.length - 1].id },
            { $set: { 'inbox.$.senderID': updateSenderInbox.inbox[updateSenderInbox.inbox.length - 1].id } },
            { new: true }
        );
        
        return NextResponse.json({ status: true })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}
