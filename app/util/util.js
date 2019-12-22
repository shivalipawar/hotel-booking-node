const connection = require('../../db')
const { executeQuery } = require("../util/queryExecutor")

const isOverlapping = (checkInTime, roomId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `
        SELECT count(*)  as res
        FROM booking
        WHERE 
        FROM_UNIXTIME(?) >=FROM_UNIXTIME(check_in) and FROM_UNIXTIME(?) < FROM_UNIXTIME(check_out) and room_id=?;`
        connection.query(sqlQuery, [checkInTime, checkInTime, roomId], function (err, result) {
            if (err) {
                console.log(JSON.stringify(err))
                reject(err)
            } else {
                console.log(JSON.stringify(result))
                if (result.length === 0) {
                    resolve(false)
                } else {
                    resolve(result[0].res > 0)
                }
            }
        });
    })
}

const isRoomValid = (roomId) => {
    const query = "SELECT true from room where id=" + roomId
    return new Promise((resolve, reject) => {
        executeQuery(query)
            .then((result) => {
                if (result.length > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch((err) => {
                reject(err);
            })
    })
}

module.exports = {
    isOverlapping,
    isRoomValid
}
