import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true},  
    coursecode: { type: String, required: true},
    subjects: { type: Array, required: true},
    totalFee: { type: Number, required: true}
});

export default mongoose.models.Course ||  mongoose.model('Course', courseSchema);