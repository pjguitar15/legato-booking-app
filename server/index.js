const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const equipmentRoutes = require('./routes/equipment');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth')); // Ensure this line is included
app.use('/api/equipment', equipmentRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Listen to requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
