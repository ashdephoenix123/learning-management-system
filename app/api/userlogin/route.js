import connectDB from "@/app/database/connection";
import { NextResponse } from "next/server";
import User from "@/app/database/model/usermodel";
import CryptoJS from "crypto-js"
import jwt from 'jsonwebtoken'

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        await connectDB();
        const findUser = await User.findOne({ email });
        if (!findUser) throw new Error("User not found!");

        const bytes = CryptoJS.AES.decrypt(findUser.password, process.env.CRYPTO_SECRET);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (password !== originalPassword) throw new Error("Invalid Credentials!");

        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        return NextResponse.json({ status: true, token })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}

/* 
jwt.verify(token, secret);
*/