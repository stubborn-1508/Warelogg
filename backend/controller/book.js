const User = require("../modals/user");
const Subunit = require("../modals/subunit");
const Book = require("../modals/book");
const Warehouse = require("../modals/warehouse");
require("dotenv").config({ path: "../config/config.env" });

const addNewBooking = async (req, res) => {
    const { user_id, subunit_id, occupiedFrom, occupiedTo } = req.body;
    if (!user_id) {
        return res.status(401).json({message: "User not logged in"});
    }
    if (!subunit_id && !occupiedFrom && !occupiedTo) {
        return res.status(422).json({message: "Please fill all the fields"});
    }
    try {
        const book = new Book({
            user_id: user_id,
            subunit_id: subunit_id,
            occupiedFrom: occupiedFrom,
            occupiedTo: occupiedTo,
            status: "Pending"
        });
        const resBook = await book.save();
        if (resBook) {
            return res.status(200).json({ message: 'Booking added successfully' });
        } else {
            return res.status(401).json({ message: "Booking is not saved properly" });
        }
    } catch (err) {
        return res.status(402).json({message: "Something went wrong!!"});
    }
}

const getUserBooking = async (req, res) => {
    const {user_id} = req.body;
    if (!user_id) {
        return res.status(401).json({message: "User not logged in"});
    }
    try {
        let myBooking = await Book.find({user_id: user_id}).clone().lean();
        if (myBooking) {
            let bookedSubunits = [];
            for(let i=0;i<myBooking.length;i++){
                let subunit = await Subunit.findOne({_id: myBooking[i].subunit_id}).clone().lean();
                let warehouse = await Warehouse.findOne({_id: subunit.warehouse_id}).clone().lean();
                if(subunit){
                    bookedSubunits.push({
                        _id: myBooking[i]._id,
                        name: warehouse.name,
                        city: warehouse.city,
                        state: warehouse.state,
                        length: subunit.length,
                        width: subunit.width,
                        height: subunit.height,
                        price: subunit.price,
                        occupiedFrom: myBooking[i].occupiedFrom,
                        occupiedTo: myBooking[i].occupiedTo,
                        status: myBooking[i].status
                    });
                }
            }
            return res.status(200).json(bookedSubunits);
        } else {
            return res.status(401).json({ message: "No booking found" });
        }
    } catch (err) {
        return res.status(402).json({message: "Something went wrong!!"});
    }
}

const cancelBooking = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(401).json({message: "User not logged in"});
    }
    try {
        const bookUpdate = await Book.updateOne({_id: id}, {status: "Cancelled"});
        if (bookUpdate) {
            return res.status(200).json({ message: 'Booking cancelled successfully' });
        }
    } catch (err) {
        return res.status(402).json({message: "Something went wrong!!"});
    }
}

module.exports = {
    addNewBooking,
    getUserBooking,
    cancelBooking
};