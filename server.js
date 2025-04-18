const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ✅ Allow only frontend domain in production
const allowedOrigins = [
  'https://www.cynosure-cynlife.com',
  'https://cynosure-cynlife.com' // just in case non-www is used
];

// ✅ CORS middleware with logging
app.use(cors({
  origin: function (origin, callback) {
    console.log('CORS origin:', origin); // 🟡 Log incoming origin

    // Allow tools like curl, Postman, or server-to-server with no origin
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Test route
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// ✅ Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// ✅ Connect MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));



