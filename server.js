require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
require('./db.js')
const { port } = require("./config/index")

const app = express();
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
    return (_req, res) => {
        res.json({ "success": "true" });
    };
}
