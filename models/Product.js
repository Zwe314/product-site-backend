const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: { type: String }, // Optional, keep for compatibility
  imageUrls: [String],        // ✅ New: Array of multiple images
  sizes: [String],            // ✅ New: Array of available sizes
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);

