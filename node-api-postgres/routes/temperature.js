const db = require('../db/db')

// TEMPERATURE Functions
//
const getTemperature = (request, response) => {
    db.query('SELECT * FROM temperature', (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

const getTemperatureByStateCounty = (request, response) => {
    const state = request.params.state
    const county = request.params.county

    db.query('SELECT * FROM temperature WHERE state = $1 AND county = $2', [state, county], (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getTemperature,
    getTemperatureByStateCounty
}