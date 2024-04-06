const Booking = require("../models/Booking");
const Rental = require("../models/Rental");

exports.getBookings = async (req, res, next) => {
  let query;

  //General users can see only their bookings!
  if (req.user.role !== "admin") {
    query = Booking.find({ user: req.user.id }).populate({
      path: "rentalProvider",
      select: "name address tel cost",
    });
  } else {
    //If you are an admin, you can see all!
    if (req.params.rentalId) {
      console.log(req.params.rentalId);

      query = Booking.find({ rentalProvider: req.params.rentalId }).populate({
        path: "rentalProvider",
        select: "name address tel cost",
      });
    } else
      query = Booking.find().populate({
        path: "rentalProvider",
        select: "name address tel cost",
      });
  }

  try {
    const bookings = await query;
    const totalCostofThatUser = bookings.reduce(
      (acc, cur) => acc + cur.rentalProvider.cost * cur.daySpend,
      0
    );

    res.status(200).json({
      success: true,
      count: bookings.length,
      totalCost: totalCostofThatUser,
      data: bookings,
    });
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Booking" });
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate({
      path: "rentalProvider",
      select: "name tel address",
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `No booking with the id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Booking" });
  }
};

exports.addBooking = async (req, res, next) => {
  try {
    req.body.rentalProvider = req.params.rentalId;

    const rental = await Rental.findById(req.params.rentalId);

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: `No rental with the id of ${req.params.rentalId}`,
      });
    }

    //add user Id to req.body
    req.body.user = req.user.id;

    //Check for existed booking
    const existedBookings = await Booking.find({ user: req.user.id });

    //If the user is not an admin, they can only create 3 bookings.
    if (existedBookings.length >= 3 && req.user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: `The user with ID ${req.user.id} has already made 3 bookings`,
      });
    }

    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot create Booking" });
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `No booking with the id of ${req.params.id}`,
      });
    }

    //Make sure user is the booking owner
    if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this booking`,
      });
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot update Booking" });
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `No booking with the id of ${req.params.id}`,
      });
    }

    //Make sure user is the booking owner
    if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this bootcamp`,
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete Booking" });
  }
};
