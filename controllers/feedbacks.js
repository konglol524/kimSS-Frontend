const Feedback = require("../models/Feedback");
const Promotion = require("../models/Promotion");


/**
 * Format for request
 * POST  {{URL}}/api/v1/feedbacks/{{promoID}}
 * {
    "comment": "kong was here",
    "rating": "5"
    }
 */
exports.addFeedback = async(req, res, next) => {
    try {
        const promo = await Promotion.findById(req.params.id)
        if(!promo) {
            return res.status(404).json({
                success: false,
                message: `No promo with the id of ${req.params.id}`,
              });
        }
        req.body.promotion = req.params.id;
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
 * GET  {{URL}}/api/v1/feedbacks/{{promoID}}
 */
exports.getFeedbacks = async(req, res, next) => {
    try {
        const promo = await Promotion.findById(req.params.id);
        if(!promo){
            return res
                .status(400)
                .json({success: false, message: "Can't find promo"})
        }
        const feedbacks = await Feedback.find({ promotion: req.params.id});
        res.status(200).json({success:true, data:feedbacks});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: "can not get feedbacks"});
    }
}

//User can only update their own feedback
/**
 * Format for request
 * PUT  {{URL}}/api/v1/feedbacks/{{feedbackID}}
 * {
    "comment": "kong was hereeeeee",
    "rating": "2"
    }
 */

exports.updateFeedback = async(req, res, next) => {
    try {
        let feedback = await Feedback.findById(req.params.id);
        if(!feedback){
            return res
                .status(400)
                .json({success: false, message: "Can't find feedback"})
        }
        
        //Make sure user is the feedback's owner
        if (feedback.user.toString() !== req.user.id) {
            return res.status(401).json({
              success: false,
              message: `User ${req.user.id} is not authorized to update this feedback`,
            });
        }

        let newFeedback = feedback;
        newFeedback.comment = req.body.comment;
        newFeedback.rating = req.body.rating;

        feedback = await Feedback.findByIdAndUpdate(req.params.id, newFeedback, {
            new: true,
            runValidators: true,
          });

        res.status(200).json({success:true, data:feedback});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: "can not update feedback"});
    }
}


//For delete feedback, user can only delete their own feedback. Admin can delete any feedback.