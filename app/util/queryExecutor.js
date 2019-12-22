const connection = require('../../db')
const executeQuery = (query, parameters) => {
    return new Promise((resolve, reject) => {
        connection.query(query, parameters, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

module.exports = { executeQuery };