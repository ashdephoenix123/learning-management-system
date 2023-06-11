import { NextResponse } from "next/server"
// import formidable from 'formidable';

export async function POST(request) {
    try {
        // const form = new formidable.IncomingForm();

        // form.parse(req, (err, fields, files) => {
        //     if (err) {
        //         console.error('Error parsing form:', err);
        //         throw new Error('Internal Server Error');
        //     }

        //     // Access the uploaded file using `files.file`
        //     const uploadedFile = files.file;

        //     // Perform operations with the uploaded file, e.g., save to disk or database

        //     return NextResponse.json({ status:true, message: 'File uploaded successfully' })
        // });
        return NextResponse.json({ status:true, message: 'File uploaded successfully' })

    } catch (error) {
        return NextResponse.json({ status: false, error: error.message })
    }
}

