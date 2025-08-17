const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// @route   POST /api/users
// @desc    Save user signup info to MongoDB
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User saved to MongoDB successfully." });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Failed to save user." });
  }
});

// @route   GET /api/users/:email
// @desc    Get user info by email
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user." });
  }
});

module.exports = router;
