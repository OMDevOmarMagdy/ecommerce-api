const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      default: 0.0,
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand'],
    },
    stock: {
      type: Number,
      required: [true, 'Please add stock count'],
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
productSchema.index({ category: 1, price: 1 });
productSchema.index({ price: 1 });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
