const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  bookingDate: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  car: {
    type: String,
    default: "Ferrari 488",
  },
  daySpend: {
    type: Number,
    default: 1,
  },
  rentalProvider: {
    type: mongoose.Schema.ObjectId,
    ref: "Rental",
    required: true,
  },
  discountPoint : {
    type: Number,
    default: 0,
  },
  cost : {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  addedPoint: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
