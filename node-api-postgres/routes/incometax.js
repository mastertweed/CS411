const db = require('../db/db')

// INCOMETAX Functions
//
const getIncomeTax = (request, response) => {
    db.query('SELECT * FROM incometax', (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getIncomeTax
}