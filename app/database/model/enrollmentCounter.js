import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    name: String, // Name of the counter (e.g., 'enrollment')
    count: { type: Number, default: 0 }, // Current count value
});

export default mongoose.models.EnrollmentCounter || mongoose.model('EnrollmentCounter', counterSchema);