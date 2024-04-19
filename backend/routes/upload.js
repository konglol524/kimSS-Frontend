const express = require("express");
const {
  uploadProfile,
  getProfilePicture
} = require("../controllers/upload");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router.put("/profile", protect, authorize('admin', 'user'), uploadProfile);
router.get("/profile", protect, authorize('admin', 'user'), getProfilePicture);

module.exports=router;