const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema({
    name : {
        type: String,
        default: "",
        required: true,
    },
    rentals: [{
        type: mongoose.Schema.ObjectId,
        ref: "Rental",
        default: "",
      }],
    promoType :{
        type:String,
        default: "Simple",
    },
    //promoType dictates the behavior of a promotion
    //simple -> maybe discount 100 baht from purchase
    //percent -> apply a percent discount from purchase
    promoNum: {
        type:Number,
        default:0
    }
    //maybe use this for the percentage of discount or cash value of discount
});

module.exports = mongoose.model("Promotion", PromotionSchema);
