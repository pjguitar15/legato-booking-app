const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');

router.post('/add', async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    const savedEquipment = await equipment.save();
    res.status(201).json(savedEquipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
