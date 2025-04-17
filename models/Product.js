const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: String, required: true }, // ✅ Changed from Number to String
  imageUrls: [String],
  sizes: [String],
  colors: [String],
  expectedDelivery: String,
  bagType: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);



