const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  airline: { type: String, required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  status: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Flight", flightSchema);
