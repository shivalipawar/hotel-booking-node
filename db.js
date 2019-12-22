const mysql = require('mysql');
const { DB_Host,
  DB_User,
  DB_Password,
  DB_Name } = require("./config/index")

var connection = mysql.createConnection({
  host: DB_Host,
  user: DB_User,
  password: DB_Password,
  database: DB_Name
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected")
});

module.exports = connection;
