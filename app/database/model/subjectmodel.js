// import mongoose from 'mongoose';

// const chapters = new mongoose.Schema({
//     chapternumber: { type: Number, required: true},
//     chaptername: { type: Number, required: true },
//     topics: {
//         type: [String],
//         default: [],
//         required: true
//     },
//     linktopdf: { type: String, required: true },
//     recordedsessions: {
//         type: [String],
//         default: [],
//     }
// })

// const subjectSchema = new mongoose.Schema({
//     subjectcode: { type: String, required: true },
//     subjectname: { type: String, required: true },
//     chapters: [chapters],
// });

// export default mongoose.models.Subject || mongoose.model('Subject', subjectSchema);