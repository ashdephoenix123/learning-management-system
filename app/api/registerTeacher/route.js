import { NextResponse } from "next/server"
import connectDB from "@/app/database/connection";
import Teacher from "@/app/database/model/teachersmodel";
import CryptoJS from "crypto-js";
import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        await connectDB();
        const { fname, lname, email, phone, address, city, state, pincode, gender, dob, coursecode, password, batchesEnrolledIn, subjectCode } = await request.json();

        const checkIfAlreadyEnrolled = await Teacher.findOne({ email });
        if (checkIfAlreadyEnrolled) throw new Error('Already Registered!');

        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
        const newTeacher = new Teacher({ fname, lname, email, phone: Number(phone), address, city, state, pincode: Number(pincode), gender, dob, coursecode, password: encryptedPassword, designation: 'Teacher', batchesEnrolledIn, subjectCode });
        await newTeacher.save();

        //send mail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'akashsarki100@gmail.com',
                pass: process.env.MAIL_PASSWORD
            }
        });

        var mailOptions = {
            from: 'Anonymous University <akashsarki100@gmail.com>',
            to: email,
            subject: 'Teacher onboarding!',
            text: 'Onboarding Confirmation Mail!',
            html: `
                <h1>Hello ${fname}</h1>
                <p>You have been successfully added to our list of Teachers. Congratulations on your feat, We are delighted to have you on Board.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        //end mail

        return NextResponse.json({ registered: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ registered: false, error: error.message }, { status: 500 })
    }
}

