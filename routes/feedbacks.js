const express = require("express");
const {
    addFeedback,
    getFeedbacks,
    updateFeedback,
    deleteFeedback,
} = require("../controllers/feedbacks");

//Include other recource routers

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");




router
  .route("/:id")
  .get(getFeedbacks)
  .put(protect, updateFeedback)
  .post(protect, authorize('admin', 'user'), addFeedback)
  .delete(protect, authorize('admin', 'user'), deleteFeedback);

module.exports = router;
