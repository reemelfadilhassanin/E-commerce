import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    type: {
      type: [String],
      required: true,
      validate: {
        validator: Array.isArray,
        message: 'Type must be an array.',
      },
    },
    price: { type: Number, required: true },
    state: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model('Product', ProductSchema);
