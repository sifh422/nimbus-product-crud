import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [2, 'Product name must be at least 2 characters'],
      maxlength: [120, 'Product name must be at most 120 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a non-negative number'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: {
        values: ['electronics', 'fashion', 'grocery', 'home', 'sports', 'other'],
        message: 'Category must be one of electronics, fashion, grocery, home, sports, other',
      },
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Index for common queries
ProductSchema.index({ name: 1, category: 1 });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);


