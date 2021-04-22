const db = require('../db/db')

// STANDARDDED Functions
//
const getStandardDed = (request, response) => {
    db.query('SELECT * FROM standardded', (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getStandardDed
}