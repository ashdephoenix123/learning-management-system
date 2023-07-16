import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
    sender: {
        type: String,
    },
    body: {
        type: String,
    },
    repliedAt: {
        type: Date,
        default: Date.now,
    },
});

const inbox = new mongoose.Schema({
    from: String,
    to: String,
    subject: String,
    message: String,
    recipientID: String,
    senderID: String,
    isRead: { type: Boolean, default: false },
    replies: [replySchema],
    isIncoming: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
});

const announcements = new mongoose.Schema({
    announcement: String,
    date: { type: Date, default: Date.now },
});

const teacherSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    coursecode: { type: String, required: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    batchesEnrolledIn: [String],
    subjectCode: [String],
    inbox: [inbox],
    announcements: [announcements]
}, { timestamps: true });

export default mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);
