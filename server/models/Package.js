const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  equipment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment', // Reference to the Equipment model
  }],
}, {
  timestamps: true, // Optional: Adds createdAt and updatedAt fields
});

const Package = mongoose.model('Package', PackageSchema);

module.exports = Package;
