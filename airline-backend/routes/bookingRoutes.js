const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const mongoose = require("mongoose");

// Dummy bookings data for when MongoDB is not connected
const dummyBookings = [];

// Create a new booking
router.post("/", async (req, res) => {
  try {
    const {
      flightId,
      firstName,
      lastName,
      email,
      phone,
      age,
      gender,
      paymentMethod,
    } = req.body;

    console.log("Received booking request:", req.body);

    if (!flightId || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        message:
          "Missing required fields: flightId, firstName, lastName, email, phone",
      });
    }

    if (mongoose.connection.readyState === 1) {
      // Convert flightId to ObjectId if it's a string
      let validFlightId;
      try {
        validFlightId = new mongoose.Types.ObjectId(flightId);
      } catch (error) {
        return res.status(400).json({
          message: "Invalid flightId format",
        });
      }

      // Create booking with only the fields that match the schema
      const bookingData = {
        flightId: validFlightId,
        firstName,
        lastName,
        email,
        phone,
        // Add optional fields if they exist
        ...(age && { age }),
        ...(gender && { gender }),
        ...(paymentMethod && { paymentMethod }),
      };

      console.log("Creating booking with data:", bookingData);

      const newBooking = new Booking(bookingData);
      await newBooking.save();

      // Return the booking with additional flight details for frontend
      const bookingResponse = {
        ...newBooking.toObject(),
        // Add flight details that frontend expects
        flightNumber: req.body.flightNumber || "N/A",
        airline: req.body.airline || "N/A",
        departure: req.body.departure || "N/A",
        arrival: req.body.arrival || "N/A",
        departureTime: req.body.departureTime || new Date(),
        arrivalTime: req.body.arrivalTime || new Date(),
        status: "Confirmed",
        price: req.body.price || 0,
      };

      res.status(201).json(bookingResponse);
    } else {
      // Return dummy response when MongoDB is not connected
      const newBooking = {
        _id: Date.now().toString(),
        flightId,
        firstName,
        lastName,
        email,
        phone,
        age,
        gender,
        paymentMethod,
        bookingDate: new Date(),
        // Add flight details for confirmation page
        flightNumber:
          req.body.flightNumber || "FL" + Math.floor(Math.random() * 1000),
        airline: req.body.airline || "FlyHigh Airlines",
        departure: req.body.departure || "BLR",
        arrival: req.body.arrival || "DEL",
        departureTime:
          req.body.departureTime || new Date(Date.now() + 24 * 60 * 60 * 1000),
        arrivalTime:
          req.body.arrivalTime || new Date(Date.now() + 27 * 60 * 60 * 1000),
        status: "Confirmed",
        price: req.body.price || Math.floor(Math.random() * 5000) + 2000,
      };
      dummyBookings.push(newBooking);
      res.status(201).json(newBooking);
    }
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Populate flightId with flight details
      const bookings = await Booking.find().populate("flightId");
      res.json(bookings);
    } else {
      res.json(dummyBookings);
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.json(dummyBookings);
  }
});

module.exports = router;
