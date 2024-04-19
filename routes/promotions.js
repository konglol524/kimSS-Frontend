const express = require("express");
const {
    addPromotion,
    deletePromotion,
    getPromotions,
    getPromotion
} = require("../controllers/promotions");

//Include other recource routers

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");


router
  .route("/")
  .post(protect, authorize("admin"), addPromotion)
  .get(getPromotions);
router
  .route("/:id")
  .delete(protect, authorize("admin"), deletePromotion)
  .get(getPromotion);

module.exports = router;
