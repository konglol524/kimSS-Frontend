const Rental = require("../models/Rental");
const Promotion = require("../models/Promotion");
const Feedback = require("../models/Feedback");



//creating a promotion also updates the shop referenced to include the promotion in it
exports.addPromotion = async(req, res, next) => {
    try {

        const promotion = await Promotion.create(req.body);
        const promoID = promotion.id;
        promotion.rentals.forEach(async (rental)=>{
            const rentalID = rental.toString();
            const newRental = await Rental.findById(rentalID);
            if(!newRental){
                console.log("not found " + rentalID);
            } else {
                if (!newRental.promotions.includes(promoID)) {
                    newRental.promotions.push(promoID);
                }
            const result = await Rental.findByIdAndUpdate(rentalID, newRental, {
                  new: true,
                  runValidators: true
             });
             console.log(result);
            }

        });

        res.status(201).json({
            success: true,
            data: promotion,
        })
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: "can not add promotion"})
    }
}


//deleting promotion cascade to feedback and also delete its promotionID from rentals
 