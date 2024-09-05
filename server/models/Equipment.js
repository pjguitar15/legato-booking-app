const mongoose = require('mongoose');

const SpecificationSchema = new mongoose.Schema({
  power: { type: String, default: '' },
  frequencyResponse: { type: String, default: '' },
  channels: { type: String, default: '' },
  inputs: { type: [String], default: [] },
  outputs: { type: [String], default: [] },
  colorTemperature: { type: String, default: '' },
  beamAngle: { type: String, default: '' },
  weight: { type: String, default: '' },
  type: { type: String, default: '' },
  polarPattern: { type: String, default: '' },
  effects: { type: [String], default: [] },
});

const EquipmentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  specifications: { type: SpecificationSchema, default: {} },
  pricePerDay: { type: Number, required: true },
  quantityAvailable: { type: Number, required: true },
  condition: { type: String, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  description: { type: String, default: '' },
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
