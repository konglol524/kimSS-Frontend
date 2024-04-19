const express = require("express");
const {
  createRental,
  getRental,
  getRentals,
  updateRental,
  deleteRental,
} = require("../controllers/rentals");

//Include other recource routers
const bookingRouter = require('./bookings');

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

//Re-route into other resource routers
router.use('/:rentalId/bookings', bookingRouter);

router
  .route("/")
  .get(getRentals)
  .post(protect, authorize("admin"), createRental);
router
  .route("/:id")
  .get(getRental)
  .put(protect, authorize("admin"), updateRental)
  .delete(protect, authorize("admin"), deleteRental);

module.exports = router;
