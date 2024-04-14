const Feedback = require("../models/Feedback");
const Promotion = require("../models/Promotion");

exports.addFeedback = async(req, res, next) => {
    try {
        const promo = await Promotion.findById(req.body.promotion)
        if(!promo) {
            return res.status(404).json({
                success: false,
                message: `No promo with the id of ${req.body.promo}`,
              });
        }
        req.body.user = req.user.id;
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


/**
 * Format for request
 * POST  {{URL}}/api/v1/feedbacks/
 * {
    "promotion": "{{promoID}}",
    "comment": "kong was here",
    "rating": "5"
    }
 */