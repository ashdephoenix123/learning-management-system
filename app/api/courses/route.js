import { NextResponse } from "next/server"
import connectDB from "@/app/database/connection";
import Course from "@/app/database/model/coursemodel";


export async function GET(request) {
    try {
        await connectDB();
        const courses = await Course.find({});
        return NextResponse.json({ status: true, courses })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}


export async function POST(request) {
    try {
        await connectDB();
        const { name, coursecode, semesters, totalFee, programInfo, courseMatrix, weeklySchedule } = await request.json();
        const findCourse = await Course.findOne({ coursecode })
        if(findCourse) throw new Error('Course already added!');
        const newCourse = new Course({ name, semesters, totalFee: Number(totalFee), coursecode, programInfo, courseMatrix, weeklySchedule });
        await newCourse.save();
        return NextResponse.json({ added: true })
    } catch (error) {
        return NextResponse.json({ added: false, error: error.message })
    }
}

