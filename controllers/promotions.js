const Rental = require("../models/Rental");
const Promotion = require("../models/Promotion");
const Feedback = require("../models/Feedback");

//get all promotions
/*
Format for request
GET {{URL}}/api/v1/promotions/
*/
exports.getPromotions = async(req, res, next) => {
    try {
        const promos = await Promotion.find();
        res.status(200).json({success:true, data:promos});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: "can not get promotions"});
    }
}


//get single promotion using promotion's ID
/*
Format for request
GET {{URL}}/api/v1/promotions/{{promoID}}
*/
exports.getPromotion = async(req, res, next) => {
    try {
        const promo = await Promotion.findById(req.params.id);
        res.status(200).json({success:true, data:promo});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: "can not get promotion"});
    }
}


//creating a promotion also updates the shop referenced to include the promotion in it
/**
 * Format for request
 * POST  {{URL}}/api/v1/promotions/
 * {
    "name":"Tanza Winter Sale",
    "rentals": [65deed7c9363d26fdca9b715, 65e300e320ed58b8b48c714c]
    "promoType": "Percent"
    "promoNum": 5
    }
 */
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
 /**
 * Format for request
 *  DEL {{URL}}/api/v1/promotions/{{promoID}}
 */
exports.deletePromotion = async(req, res, next) => {
    try {
        const promo = await Promotion.findByIdAndDelete(req.params.id);
        if(!promo){
            return res
                .status(400)
                .json({success: false, message: "Can't find promo"})
        }
        //!Cascade Feedback
        promo.rentals.forEach(async (rental)=>{
            const rentalID = rental.toString();
            const newRental = await Rental.findById(rentalID);
            if(!newRental){
                console.log("not found " + rentalID);
            } else {
                let index = newRental.promotions.indexOf(promo._id);
                if (index !== -1) {
                    newRental.promotions.splice(index, 1);
                }
            const result = await Rental.findByIdAndUpdate(rentalID, newRental, {
                  new: true,
                  runValidators: true
             });
             //console.log(result);
            }
        });    

        await Feedback.deleteMany({ promotion: promo._id});
        

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: "can not delete promotion"})
    }
 }

 