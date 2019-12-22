const connection = require('../../db')
const util = require('../util/util')
const { InValidRoomIdError } = require("../util/CustomError")

exports.findOne = (req, res) => {
    new Promise((resolve, reject) => {
        connection.query("SELECT * FROM booking where id=" + req.params.id, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        });
    }).then(result => {
        res.send(result)
    }).catch(err => {
        return res.status(500).send();
    })
};

exports.create = (req, res) => {
    const bookingDetails = req.body;
    util.isOverlapping(bookingDetails.checkIn, bookingDetails.roomId).then(isOverlapping => {
        if (isOverlapping) {
            return res.status(400).send({message : "selected room is already alloted for given time, please select different room or slot"});
        }
        return bookRoom(bookingDetails, res);
    }).catch(err => {
        if (err instanceof InValidRoomIdError) {
            return res.status(400).send(err.message);
        }
        console.log(JSON.stringify(err))
        return res.status(500).send();
    })
};

function bookRoom(bookingDetails, res) {
    new Promise((resolve, reject) => {
        const sqlQuery = "INSERT INTO booking (user_id,room_id,check_in,check_out) VALUES ?";
        const { userId, roomId, checkIn, checkOut } = bookingDetails;
        var values = [
            [userId, roomId, checkIn, checkOut]
        ];
        connection.query(sqlQuery, [values], function (err, result) {
            if (err) {
                console.log(JSON.stringify);
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    }).then(result => {
        res.send({ message: "booking successfull" });
    }).catch(err => {
        console.log(JSON.stringify(err));
        return res.status(500).send();
    });
}
