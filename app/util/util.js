const connection = require('../../db')
const { InValidRoomIdError } = require("./CustomError")
const isOverlapping = (checkInTime, roomId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `
        SELECT b.room_id, x.cnt as res FROM booking as b, (SELECT count(*) as cnt
            FROM booking
            WHERE 
            FROM_UNIXTIME(?) >=FROM_UNIXTIME(check_in) and FROM_UNIXTIME(?) < FROM_UNIXTIME(check_out) and room_id=?) x where b.room_id=? group by b.room_id;`
        connection.query(sqlQuery, [checkInTime, checkInTime, roomId, roomId], function (err, result) {
            if (err) {
                console.log(JSON.stringify)
                reject(err)
            } else {
                console.log(JSON.stringify(result))
                if (result.length === 0) {
                    reject(new InValidRoomIdError(roomId))
                } else {
                    resolve(result[0].res > 0)
                }
            }
        });
    })
}

module.exports = { isOverlapping }
