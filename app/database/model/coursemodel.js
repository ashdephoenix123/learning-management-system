import mongoose from 'mongoose';

const chapters = new mongoose.Schema({
    chapternumber: { type: Number, required: true },
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

const importantAnnouncements = new mongoose.Schema({
    title: { type: String },
    linkToPDF: { type: String }
})

const programInfo = new mongoose.Schema({
    handbook: { type: String, required: true },
    calendarEvents: { type: String, required: true },
    faqs: { type: String, required: true },
    importantAnnouncements: [importantAnnouncements]
})

const weeklySchedule = new mongoose.Schema({
    weekNumber: { type: Number },
    linkToPDF: { type: String }
})

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    coursecode: { type: String, required: true, unique: true },
    semesters: [semesters],
    totalFee: { type: Number, required: true },
    programInfo: programInfo,
    courseMatrix: { type: String, required: true },
    weeklySchedule: [weeklySchedule]
});

export default mongoose.models.Course || mongoose.model('Course', courseSchema);