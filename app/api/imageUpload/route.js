import { NextResponse } from "next/server";
import mime from "mime";
import { Storage } from "@google-cloud/storage";
import User from "@/app/database/model/usermodel";
import connectDB from "@/app/database/connection";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("imageFile");
        const email = formData.get("userEmail");

        await connectDB();

        const findUser = await User.findOne({ email: email });

        if (!file)
            return NextResponse.json(
                { error: "File is required." },
                { status: 400 }
            );

        const buffer = Buffer.from(await file.arrayBuffer());

        const sameDate = Date.now();
        const filename = `${sameDate}-${findUser.enrollmentNumber}.${mime.getExtension(
            file.type
        )}`;

        const credential = JSON.parse(
            Buffer.from(process.env.GOOGLE_SERVICE_KEY, "base64").toString()
        );

        const storage = new Storage({
            projectId: 'anonymousuniversity',
            credentials: {
                client_email: credential.client_email,
                private_key: credential.private_key,
            },
        });
        const bucketName = "anonymous_user_images"; // Replace with your GCP bucket name

        const bucket = storage.bucket(bucketName);

        //check

        storage.bucket(bucketName).getFiles(function (err, files) {
            if (!err) {
                files.forEach(function (file) {
                   if(file.name.includes(findUser.enrollmentNumber)){
                       file.delete();
                   }
                });
            }
        })

        //end check


        const newFile = bucket.file(`uploads/userImages/${filename}`);

        await newFile.save(buffer);

        const imageUrl = `https://storage.googleapis.com/${bucketName}/uploads/userImages/${filename}`;

        // Update the user's image field in the database with the GCP bucket URL
        await User.updateOne({ email }, { $set: { image: imageUrl } });


        return NextResponse.json({ added: true });
    } catch (error) {
        return NextResponse.json({ added: false, error: error.message });
    }
}