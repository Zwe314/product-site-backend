
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ✅ Allow only your frontend domain in production
const allowedOrigins = ['https://www.cynosure-cynlife.com'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  }
}));

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
