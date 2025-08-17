const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const mongoose = require("mongoose");

// Dummy users data for when MongoDB is not connected
const dummyUsers = [];

// Get all users
router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const users = await User.find();
      res.json(users);
    } else {
      res.json(dummyUsers);
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.json(dummyUsers);
  }
});

// Create a user
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address } = req.body;

    if (!firstName || !lastName || !email || !phone || !address) {
      return res.status(400).json({
        message:
          "Missing required fields: firstName, lastName, email, phone, address",
      });
    }

    if (mongoose.connection.readyState === 1) {
      const newUser = new User({ firstName, lastName, email, phone, address });
      await newUser.save();
      res.status(201).json(newUser);
    } else {
      // Return dummy response when MongoDB is not connected
      const newUser = {
        _id: Date.now().toString(),
        firstName,
        lastName,
        email,
        phone,
        address,
        createdAt: new Date(),
      };
      dummyUsers.push(newUser);
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET all users (for testing/viewing data)
router.get("/all", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { uid, email, name, photo, provider } = req.body;

    if (!uid || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({ uid, email, name, photo, provider });
    }

    res.json(user);
  } catch (err) {
    console.error("User login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
