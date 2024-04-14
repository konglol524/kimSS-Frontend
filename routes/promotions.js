const express = require("express");
const {
    addPromotion,
    deletePromotion
} = require("../controllers/promotions");

//Include other recource routers

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");


router
  .route("/")
  .post(protect, authorize("admin"), addPromotion);
router
  .route("/:id")
  .delete(protect, authorize("admin"), deletePromotion)

module.exports = router;
