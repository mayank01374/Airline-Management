const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  paymentMethod: { type: String },
  address: { type: String },
  bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
