
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Test route – must be registered BEFORE .listen()
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// Product routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Port setup
const PORT = process.env.PORT || 5000;

// Database connection and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));


