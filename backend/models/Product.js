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
    state: { type: String, enum: ['متوفر', 'غير متوفر'], required: true },
    soldCount: { type: Number, default: 0 },

    isFeatured: {
      type: Boolean,
      default: true, // Set to true to mark a product as featured
    },
  },

  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
