const express = require("express");
const {
  uploadProfile
} = require("../controllers/upload");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router.put("/profile", protect, authorize('admin', 'user'), uploadProfile);

module.exports=router;