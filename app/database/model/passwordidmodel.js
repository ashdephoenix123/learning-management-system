import mongoose from 'mongoose';

const passwordIdSchema = new mongoose.Schema({
    passwordID: { type: String, required: true},
    email: { type: String, required: true},
});

export default mongoose.models.PasswordID ||  mongoose.model('PasswordID', passwordIdSchema);