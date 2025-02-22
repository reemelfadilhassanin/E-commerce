import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, // Timestamp when OTP is generated
  },
  { timestamps: true }
);

export default mongoose.model('Otp', otpSchema);
