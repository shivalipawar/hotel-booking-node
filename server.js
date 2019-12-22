require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
require('./db.js')
const app = express();
const { port } = require("./config/index")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('express-request-response-logger')());
app.use(bodyParser.json())

app.get('/health', health());
require('./app/routes/room.routes.js')(app);
require('./app/routes/booking.routes.js')(app);

app.listen(port, () => {
    console.log("Server is listening on port :" + port);
});

module.exports = app;

function health() {
    return (req, res) => {
        res.json({ "success": "true" });
    };
}
