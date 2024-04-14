const Feedback = require("../models/Feedback");

exports.addFeedback = async(req, res, next) => {
    try {
        const feedback = await Feedback.create(req.body);
        res.status(201).json({
            success: true,
            data: feedback,
        })
    } catch (error){
        console.log(error.stack);
        return res.status(500).json({success: false, message: "can not add feedback"});
    }
};