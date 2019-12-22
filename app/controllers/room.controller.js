const connection = require('../../db')
const util  = require('../util/util')
const { InValidRoomIdError } = require("../util/CustomError")

exports.findAll = (req, res) => {
    new Promise((resolve, reject) => {
        connection.query("SELECT * FROM room", function (err, result) {
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

exports.checkAvailability = (req,res) =>{
    const dates = req.body;
    util.isOverlapping(dates.checkIn, req.params.roomId).then(isOverlapping => {
        if (isOverlapping) {
            return res.status(200).send({message:"Not Available"});
        }
        return res.status(200).send({message:"Available"});

    }).catch(err => {
        if (err instanceof InValidRoomIdError) {
            return res.status(400).send(err.message);
        }
        console.log(JSON.stringify(err))
        return res.status(500).send();
    })
}
