import mongoose from 'mongoose';

const subjects = new mongoose.Schema({
    subjectcode: { type: String, required: true }
})

const semesters = new mongoose.Schema({
    semester: { type: Number, required: true },
    subjects: [subjects],
})

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    coursecode: { type: String, required: true },
    semesters: [semesters],
    totalFee: { type: Number, required: true }
});

export default mongoose.models.Course || mongoose.model('Course', courseSchema);