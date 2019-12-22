const util = require('../util/util')
const { InValidRoomIdError } = require("../util/CustomError")
const { executeQuery } = require("../util/queryExecutor")
const { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST } = require('http-status-codes');

exports.findAll = (_req, res) => {
    const promise = executeQuery("SELECT * FROM room", [])
    promise.then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
        return res.status(INTERNAL_SERVER_ERROR).send();
    })
};

exports.checkAvailability = (req, res) => {
    const dates = req.body;
    const roomID = req.params.roomId;
    util.isRoomValid(roomID).then((isValid) => {
        if (!isValid) {
            const error = new InValidRoomIdError(roomID);
            console.log(error)
            return res.status(BAD_REQUEST).send(error.message);
        }
        util.isOverlapping(dates.checkIn, roomID).then(isOverlapping => {
            if (isOverlapping) {
                return res.status(OK).send({ message: "Not Available" });
            }
            return res.status(OK).send({ message: "Available" });
        }).catch(err => {

            console.log(JSON.stringify(err))
            return res.status(INTERNAL_SERVER_ERROR).send();
        })

    }).catch(err => {
        console.log(JSON.stringify(err))
        return res.status(INTERNAL_SERVER_ERROR).send();
    })
}
