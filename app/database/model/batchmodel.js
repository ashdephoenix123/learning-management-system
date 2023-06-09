import mongoose from 'mongoose';

const inbox = new mongoose.Schema({
    from: String,
    subject: String,
    message: String,
    date: { type: Date, default: Date.now },
});

const announcements = new mongoose.Schema({
    announcement: String,
    date: { type: Date, default: Date.now },
});

const batchSchema = new mongoose.Schema({
    batchCode: { type: String, required: true },
    batchShortName: { type: String, required: true },
    batchFullName: { type: String, required: true },
    intake: { type: Boolean, required: true },
    coursecode: { type: String, required: true },
    announcements: [announcements],
    inbox: [inbox],
    semester: {type: Number, required: true, default: 1}
});


export default mongoose.models.Batch || mongoose.model('Batch', batchSchema);
