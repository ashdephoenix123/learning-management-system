import { NextResponse } from "next/server"
import connectDB from "@/app/database/connection";
import User from "@/app/database/model/usermodel";
import CryptoJS from "crypto-js";

export async function POST(request) {
    try {
        await connectDB();
        const { fname, lname, email, phone, address, city, state, pincode, gender, dob, fathername, mothername, course, password, razorpay_payment_id, razorpay_order_id, razorpay_signature, orderID } = await request.json();
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
        const newUser = new User({ fname, lname, email, phone: Number(phone), address, city, state, pincode: Number(pincode), gender, dob, fathername, mothername, coursecode: course, password: encryptedPassword, paymentDetails: { razorpay_payment_id, razorpay_order_id, razorpay_signature }, status: 'Paid', orderID });
        await newUser.save();
        return NextResponse.json({ registered: true })
    } catch (error) {
        return NextResponse.json({ registered: false, error: error.message })
    }
}

