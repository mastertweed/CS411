const db = require('../db/db')

// CENSUS Functions
//
const getCensus = (request, response) => {
    db.query('SELECT * FROM census', (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

const getCensusByCityState = (request, response) => {
    const city = request.params.city
    const state = request.params.state

    db.query('SELECT * FROM census WHERE city = $1 AND state = $2', [city, state], (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getCensus,
    getCensusByCityState
}
