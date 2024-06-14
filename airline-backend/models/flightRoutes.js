const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");

// Create a new flight booking
router.post("/book", async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    await newFlight.save();
    res.status(201).json(newFlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all flights
router.get("/", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
