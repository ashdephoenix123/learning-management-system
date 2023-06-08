import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true},
    lname: { type: String, required: true},
    email: { type: String, required: true},
    phone: { type: Number, required: true},
    address: { type: String, required: true},
    city: { type: String, required: true},
    state: { type: String, required: true},
    pincode: { type: Number, required: true},
    gender: { type: String, required: true},
    dob: { type: String, required: true},
    fathername: { type: String, required: true},
    mothername: { type: String, required: true},
    coursecode: { type: String, required: true},
    password: { type: String, required: true},
    paymentDetails: { type: Object, required: true},
    status: { type: String, required: true, default: "Pending"},
    orderID: { type: String, required: true}
});

export default mongoose.models.User ||  mongoose.model('User', userSchema);