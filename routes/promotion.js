const express = require("express");
const {
    addPromotion
} = require("../controllers/promotions");

//Include other recource routers

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");


router
  .route("/")
  .post(protect, authorize("admin"), addPromotion);


module.exports = router;
