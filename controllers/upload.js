const User = require("../models/User");

exports.uploadProfile = async (req, res, next) => {
    const pic = req.body.pic;
    console.log(pic);
    let updateData = req.user;
    updateData.profilePic = pic;
    console.log(updateData);
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
        res.status(200).json({success: true, data: updatedUser})
    } catch (error) {
      res.status(400).json({success: false, message: error.message})
    }
  };