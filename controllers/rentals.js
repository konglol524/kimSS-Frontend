const Rental = require('../models/Rental');

exports.getRentals= async (req, res, next) => {
    try{
        let query;

        //Copy req.query
        const reqQuery = {...req.query};

        //Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit'];

        //Loop over remove fields and delete them from reqQuery
        removeFields.forEach( param => delete reqQuery[param]);
        console.log(reqQuery);

        //Create query string
        let queryStr = JSON.stringify(reqQuery);

        //Create operators ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`);

        //finding resource,
        query = Rental.find(JSON.parse(queryStr));
        // .populate('bookings');
       
        //Select Fields
        if(req.query.select){
            const fields=req.query.select.split(',').join(' ');
            query = query.select(fields);
        }
        
        //Sort
        if(req.query.sort){
            const sortBy=req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort("name");
        }

        //Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 25;
        const startIndex = (page-1)*limit;
        const endIndex = page * limit;
        const total = await Rental.countDocuments();

        query=query.skip(startIndex).limit(limit);

        //Executing query
        const rentals = await query;

        res.status(200).json({
            success: true, 
            count: rentals.length, 
            page,
            data: rentals
        });
    } catch(err){
        res.status(400).json({success:false});
    }
};

exports.getRental= async (req, res, next) => {
    try{
        const rental = await Rental.findById(req.params.id);
       
        if(!rental){
            return res.status(400).json({success:false});
        }

        res.status(200).json({success:true, data:rental});
    } catch(err){
        res.status(400).json({success:false});
    }
};

exports.createRental= async (req, res, next) => {
    const rental = await Rental.create(req.body);
    res.status(201).json({success:true, data: rental});
};

exports.updateRental= async (req, res, next) => {
    try{
        const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
       
        if(!rental){
            return res.status(400).json({success: false});
        }

        res.status(200).json({success:true, data: rental});
    } catch(err){
        res.status(400).json({success:false});
    }
};

exports.deleteRental= async (req, res, next) => {
    try{
        const rental = await Rental.findByIdAndDelete(req.params.id);
        if(!rental){
            return res.status(400).json({success: false});
        }
        res.status(200).json({success:true, data: {}});
    } catch(err){
        res.status(400).json({success:false});
    }
};
