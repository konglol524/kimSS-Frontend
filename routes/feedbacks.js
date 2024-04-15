const express = require("express");
const {
    addFeedback,
    getFeedbacks,
    updateFeedback,
} = require("../controllers/feedbacks");

//Include other recource routers

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");




router
  .route("/:id")
  .get(getFeedbacks)
  .put(protect, updateFeedback)
  .post(protect, authorize('admin', 'user'), addFeedback);

module.exports = router;
