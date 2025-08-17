const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const mongoose = require("mongoose");

// Dummy reviews data for when MongoDB is not connected
const dummyReviews = [
  {
    _id: "1",
    airline: "Indigo",
    review: "Great service and on-time flights. Highly recommended!",
    rating: 5,
    createdAt: new Date("2024-06-15T10:00:00Z"),
  },
  {
    _id: "2",
    airline: "Vistara",
    review: "Excellent customer service and comfortable seats.",
    rating: 4,
    createdAt: new Date("2024-06-14T15:30:00Z"),
  },
  {
    _id: "3",
    airline: "Akasa Air",
    review: "Good value for money. Clean aircraft and friendly staff.",
    rating: 4,
    createdAt: new Date("2024-06-13T09:15:00Z"),
  },
];

// Create a new review
router.post("/", async (req, res) => {
  try {
    const { airline, review, rating } = req.body;

    if (!airline || !review || !rating) {
      return res.status(400).json({
        message: "Missing required fields: airline, review, rating",
      });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      // For now, create a review without user association
      // In a real app, you'd get the user from authentication
      const reviewData = {
        airline,
        review,
        rating: parseInt(rating),
        user: null, // This will be updated when authentication is implemented
      };

      const newReview = new Review(reviewData);
      await newReview.save();
      res.status(201).json(newReview);
    } else {
      // Return dummy response when MongoDB is not connected
      const newReview = {
        _id: Date.now().toString(),
        airline,
        review,
        rating: parseInt(rating),
        createdAt: new Date(),
      };
      dummyReviews.push(newReview);
      res.status(201).json(newReview);
    }
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(400).json({ message: error.message });
  }
});

// Get all reviews
router.get("/", async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      const reviews = await Review.find().populate(
        "user",
        "firstName lastName email"
      );
      res.json(reviews);
    } else {
      // Return dummy data when MongoDB is not connected
      res.json(dummyReviews);
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    // Return dummy data as fallback
    res.json(dummyReviews);
  }
});

module.exports = router;
