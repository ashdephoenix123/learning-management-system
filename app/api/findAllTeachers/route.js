import { NextResponse } from "next/server"
import connectDB from "@/app/database/connection";
import Teacher from "@/app/database/model/teachersmodel";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const coursecode = searchParams.get('coursecode');
        const batchcode = searchParams.get('batchcode');
        await connectDB();
        const allTeachers = await Teacher.find();
        const filteredTeachers = allTeachers.filter((individual) => {
            return individual.coursecode === coursecode && individual.batchesEnrolledIn.includes(batchcode)
        })


        return NextResponse.json({ status: true, teachers: filteredTeachers })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}