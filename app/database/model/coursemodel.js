import mongoose from 'mongoose';

const chapters = new mongoose.Schema({
    chapternumber: { type: Number, required: true},
    chaptername: { type: String, required: true },
    topics: {
        type: [String],
        default: [],
        required: true
    },
    linktopdf: { type: String, required: true },
    recordedsessions: {
        type: [String],
        default: [],
    }
})

const subjects = new mongoose.Schema({
    subjectcode: { type: String, required: true, unique: true },
    subjectname: { type: String, required: true },
    chapters: [chapters],
    subjectimage: { type: String, required: true },
})

const semesters = new mongoose.Schema({
    semester: { type: Number, required: true },
    subjects: [subjects],
})

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    coursecode: { type: String, required: true, unique: true },
    semesters: [semesters],
    totalFee: { type: Number, required: true }
});

export default mongoose.models.Course || mongoose.model('Course', courseSchema);