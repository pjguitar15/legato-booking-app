const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');

// POST route to add new equipment
router.post('/add', async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    const savedEquipment = await equipment.save();
    res.status(201).json(savedEquipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET route to fetch all equipment
router.get('/all', async (req, res) => {
  try {
    const equipments = await Equipment.find(); // Fetch all equipment from DB
    res.status(200).json(equipments); // Respond with the equipment list
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT route to update equipment by model
router.put('/update/:model', async (req, res) => {
  const { model } = req.params;
  const updatedData = req.body;

  try {
    const updatedEquipment = await Equipment.findOneAndUpdate(
      { model: model }, // Find equipment by model
      updatedData, // Data to update
      { new: true } // Return the updated document
    );

    if (!updatedEquipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    res.status(200).json(updatedEquipment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE route to remove equipment by model
router.delete('/delete/:model', async (req, res) => {
  const { model } = req.params;

  try {
    const deletedEquipment = await Equipment.findOneAndDelete({ model: model });

    if (!deletedEquipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    res.status(200).json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
