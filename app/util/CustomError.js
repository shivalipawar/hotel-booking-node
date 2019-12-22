class InValidRoomIdError extends Error {
    constructor(roomId) {
        super("Invalid room Id :" + roomId)
    }
}

module.exports = {
    InValidRoomIdError
}