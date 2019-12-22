const util = require('../util/util')
const { executeQuery } = require("../util/queryExecutor")
const { InValidRoomIdError } = require("../util/CustomError")
const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('http-status-codes');

exports.findOne = (req, res) => {
    const query = "SELECT * FROM booking where id=" + req.params.id;
    executeQuery(query)
        .then(result => {
            res.send(result)
        }).catch(err => {
            console.log(err)
            return res.status(INTERNAL_SERVER_ERROR).send();
        })
};

exports.create = (req, res) => {
    const bookingDetails = req.body;
    util.isRoomValid(bookingDetails.roomId).then((isValid) => {
        if (!isValid) {
            const error = new InValidRoomIdError(bookingDetails.roomId);
            console.log(error)
            return res.status(BAD_REQUEST).send(error.message);
        }
        util.isOverlapping(bookingDetails.checkIn, bookingDetails.roomId).then(isOverlapping => {
            if (isOverlapping) {
                return res.status(BAD_REQUEST).send({ message: "selected room is already alloted for given time, please select different room or slot" });
            }
            return bookRoom(bookingDetails, res);
        }).catch(err => {
            console.log(JSON.stringify(err))
            return res.status(INTERNAL_SERVER_ERROR).send();
        })
    }).catch((err) => {
        console.log(JSON.stringify(err))
        return res.status(INTERNAL_SERVER_ERROR).send();
    })

};

function bookRoom(bookingDetails, res) {
    const sqlQuery = "INSERT INTO booking (user_id,room_id,check_in,check_out) VALUES ?";
    const { userId, roomId, checkIn, checkOut } = bookingDetails;
    var values = [
        [userId, roomId, checkIn, checkOut]
    ];
    executeQuery(sqlQuery, [values]).then(() => {
        res.send({ message: "booking successfull" });
    }).catch(err => {
        console.log(JSON.stringify(err));
        return res.status(INTERNAL_SERVER_ERROR).send();
    });
}
