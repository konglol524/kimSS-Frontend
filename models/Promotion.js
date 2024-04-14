const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema({
    name : {
        type: String,
        default: "",
    },
    rentals: [{
        type: mongoose.Schema.ObjectId,
        ref: "Rental",
        default: "",
      }],
});

module.exports = mongoose.model("Promotion", PromotionSchema);
