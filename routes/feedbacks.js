const express = require("express");
const {
    addFeedback
} = require("../controllers/feedbacks");

//Include other recource routers

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");


router
  .route("/")
  .post(protect, authorize('admin', 'user'), addFeedback);


module.exports = router;
