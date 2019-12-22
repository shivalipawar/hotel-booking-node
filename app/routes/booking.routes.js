module.exports = (app) => {
    const booking = require('../controllers/booking.controller.js');
    
    app.get('/booking/:id', booking.findOne);

    app.post('/booking', booking.create);
}