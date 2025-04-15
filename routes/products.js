const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { upload } = require('../utils/cloudinary');

// Upload image to Cloudinary
router.post('/upload-image', upload.single('image'), (req, res) => {
  try {
    res.status(200).json({ imageUrl: req.file.path });
  } catch (err) {
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get product' });
  }
});

// Add a new product
router.post('/', async (req, res) => {
  const { name, description, price, imageUrl, imageUrls, sizes } = req.body;

  if (!name || !price || (!imageUrl && (!imageUrls || imageUrls.length === 0))) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
      imageUrls,
      sizes
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Edit a product
router.put('/:id', async (req, res) => {
  const { name, description, price, imageUrl, imageUrls, sizes } = req.body;

  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, imageUrl, imageUrls, sizes },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Confirm order (Optional endpoint)
router.post('/:id/order', async (req, res) => {
  try {
    const { size, email } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Here you can store order, send email, etc.
    res.status(200).json({ message: `Order confirmed for ${product.name} (Size: ${size}) to ${email}` });
  } catch (err) {
    res.status(500).json({ error: 'Order failed' });
  }
});

module.exports = router;

