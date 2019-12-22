module.exports = (app) => {
    const room = require('../controllers/room.controller.js');
    
    app.get('/room', room.findAll);

    app.post('/room/:roomId/available', room.checkAvailability);
}