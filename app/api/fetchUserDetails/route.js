import { NextResponse } from "next/server";
import User from "@/app/database/model/usermodel";
import Course from "@/app/database/model/coursemodel";
import Batch from "@/app/database/model/batchmodel";

export async function POST(request) {
    try {
        const userInfo = await request.json();

        // fetch User and all its details
        const finduser = await User.findOne({ email: userInfo.email });
        const courseEnrolled = Course.findOne({ coursecode: finduser.coursecode });
        const batchEnrolled = Batch.findOne({ batchCode: finduser.batchCode });

        const EnrolledIn = await Promise.all([courseEnrolled, batchEnrolled]);
        const allDetails = {
            userDetails: finduser,
            courseDetails: EnrolledIn[0],
            batchDetails: EnrolledIn[1]
        }

        return NextResponse.json({ status: true, allDetails })
    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}

