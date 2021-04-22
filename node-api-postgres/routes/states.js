const db = require('../db/db')

// STATES Functions
//
const getStates = (request, response) => {
    db.query('SELECT * FROM states', (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getStates
}