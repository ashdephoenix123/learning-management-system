import { NextResponse } from "next/server"
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import User from "@/app/database/model/usermodel";
import connectDB from "@/app/database/connection";

export async function POST(request) {
    try {

        const formData = await request.formData();
        const file = formData.get("imageFile");
        const email = formData.get("userEmail");

        await connectDB();

        const findUser = await User.findOne({ email: email })

        if (!file) return NextResponse.json(
            { error: "File blob is required." },
            { status: 400 }
        );
        const buffer = Buffer.from(await file.arrayBuffer());

        const relativeUploadDir = `/uploads/userImages`;
        const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

        try {
            await stat(uploadDir);
        } catch (e) {
            if (e.code === "ENOENT") {
                await mkdir(uploadDir, { recursive: true });
            } else {
                console.error(
                    "Error while trying to create directory when uploading a file\n",
                    e
                );
                return NextResponse.json(
                    { added: false, error: "Something went wrong." },
                    { status: 500 }
                );
            }
        }

        try {
            const filename = `${findUser.enrollmentNumber}.${mime.getExtension(file.type)}`;
            
            await writeFile(`${uploadDir}/${filename}`, buffer);

            await User.updateOne({ email }, { $set: { image: `/uploads/userImages/${filename}` } });

            return NextResponse.json({ added: true });
        } catch (e) {
            console.error("Error while trying to upload a file\n", e);
            return NextResponse.json(
                { error: "Something went wrong." },
                { status: 500 }
            );
        }

        // return NextResponse.json({ added: true })
    } catch (error) {
        return NextResponse.json({ added: false, error: error.message })
    }
}

