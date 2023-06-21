import mongoose from 'mongoose';
import Counter from './enrollmentCounter.js';

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

const userSchema = new mongoose.Schema({
    enrollmentNumber: { type: String, unique: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    fathername: { type: String, required: true },
    mothername: { type: String, required: true },
    coursecode: { type: String, required: true },
    password: { type: String, required: true },
    paymentDetails: { type: Object, required: true },
    status: { type: String, required: true, default: "Pending" },
    orderID: { type: String, required: true },
    batchCode: { type: String, required: true },
    image: { data: String },
    inbox: [inbox],
    announcements: [announcements]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    try {
        const user = this;
        let counter = await Counter.findOne({ name: 'enrollment' });

        if (!counter) {
            // If counter document doesn't exist, create it with the pre-defined enrollment number
            counter = await Counter.create({ name: 'enrollment', count: 10000 });
            user.enrollmentNumber = `OPEN${this.coursecode.toUpperCase()}${counter.count}`;
        } else {
            // If counter document exists, increment the count by 1
            counter.count += 1;
            await counter.save();
            user.enrollmentNumber = `OPEN${this.coursecode.toUpperCase()}${counter.count}`;
        }

        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
//OPEN${this.coursecode.toUpperCase()}