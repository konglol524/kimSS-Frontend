const User = require("../models/User");
const Profile = require("../models/Profile");

exports.uploadProfile = async (req, res, next) => {
    const pic = req.body.pic;
    try {
        const pfp = await Profile.findOne({ user : req.user.id })
        console.log(pfp);
        if(pfp){
          const updateData = pfp;
          updateData.profilePic = pic;
          const updatedProfile = await Profile.findByIdAndUpdate(pfp.id, updateData, {new: true} )
          res.status(200).json({success: true, data: updatedProfile})
          console.log("profile found");
        } else {
          const ProfileData = {
            user: req.user.id,
            profilePic: pic
          }
          const newProfile = await Profile.create(ProfileData);
          res.status(200).json({success: true, data: newProfile})
          console.log("profile not found");
        } 

    } catch (error) {
      res.status(400).json({success: false, message: error.message})
    }
  };