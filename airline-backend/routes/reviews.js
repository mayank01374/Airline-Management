const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Create a new review
router.post("/", async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().populate(
      "user",
      "firstName lastName email"
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
