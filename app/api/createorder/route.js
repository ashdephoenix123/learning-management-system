import { NextResponse } from "next/server"
import connectDB from "@/app/database/connection";
import User from "@/app/database/model/usermodel";
import Razorpay from 'razorpay';
import Batch from "@/app/database/model/batchmodel";

export async function POST(request) {
    try {
        await connectDB();
        const { email, courseFee, batchCode } = await request.json();

        const findBatch = await Batch.findOne({ batchCode });
        if(!findBatch) throw new Error('Batch not found!');
        if(findBatch.intake === false) throw new Error('Batch is not open for intake!');

        const findUser = await User.findOne({ email });
        if(findUser) throw new Error('User already registered for a course!');

        // Razorpay
        let instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEYID, key_secret: process.env.RAZORPAY_KEYSECRET })

        const resp = await instance.orders.create({
            amount: courseFee * 100,
            currency: "INR",
            receipt: `Receipt: #${Math.floor(Date.now() * Math.random())}`,
        })
    
        return NextResponse.json({ created: true, resp })
    } catch (error) {
        return NextResponse.json({ created: false, error: error.message })
    }
}

