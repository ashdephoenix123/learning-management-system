import connectDB from "@/app/database/connection";
import { NextResponse } from "next/server";
import PasswordID from "@/app/database/model/passwordidmodel";
import User from "@/app/database/model/usermodel";
import CryptoJS from "crypto-js";

export async function PATCH(request) {
    try {
        const { newpassword, id } = await request.json();
        await connectDB();
        const getPasswordID = await PasswordID.findOne({ passwordID: id });
        if (!getPasswordID || getPasswordID.passwordID !== id) throw new Error('Something went wrong, Please try again later!');
        const encryptedPassword = CryptoJS.AES.encrypt(newpassword, process.env.CRYPTO_SECRET).toString();
        const updatePassword = await User.updateOne({ email: getPasswordID.email }, { $set: { password: encryptedPassword } });
        if (updatePassword.modifiedCount === 0) throw new Error('Something went wrong, Please try again later!')
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }
}