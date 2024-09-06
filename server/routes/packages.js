const express = require('express');
const router = express.Router();
const Package = require('../models/Package.js');

// Create a new package
router.post('/create', async (req, res) => {
  try {
    const { name, price, equipment } = req.body;
    // Validate that equipment is an array and contains the necessary fields
    if (!Array.isArray(equipment)) {
      return res.status(400).json({ error: "Invalid equipment data" });
    }
    // Ensure each equipment item has the required properties
    for (const eq of equipment) {
      if (!eq._id || !eq.brand || !eq.model || !eq.imageUrl) {
        return res.status(400).json({ error: "Incomplete equipment data" });
      }
    }
    const newPackage = new Package({ name, price, equipment });
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all packages
router.get('/all', async (req, res) => {
  try {
    const packages = await Package.find().populate('equipment');
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single package by ID
router.get('/:id', async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id).populate('equipment');
    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.status(200).json(pkg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a package
router.put('/update/:id', async (req, res) => {
  try {
    const { name, price, equipment } = req.body;
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      { name, price, equipment },
      { new: true }
    );
    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a package
router.delete('/delete/:id', async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
