const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    profilePic : {
        type: String,
        default: "",
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
});

module.exports = mongoose.model("Profile", ProfileSchema);
