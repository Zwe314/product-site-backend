const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ✅ Allow only frontend domain in production
const allowedOrigins = ['https://www.cynosure-cynlife.com'];

app.use(cors({
  origin: 'https://www.cynosure-cynlife.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

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


