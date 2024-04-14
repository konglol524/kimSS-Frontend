const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        default: "",
    },
    promotion: {
        type: mongoose.Schema.ObjectId,
        ref: "Promotion",
        default: "",
      },
    comment: {
        type: String,
        maxlength: 1000 
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
