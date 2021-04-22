const db = require('../db/db')

// ZIPCODES Functions
//
const getZipCodes = (request, response) => {
    db.query('SELECT * FROM zipcodes', (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

const getZipCodesByZip = (request, response) => {
    const zip = parseInt(request.params.zip)

    db.query('SELECT * FROM zipcodes WHERE zip = $1', [zip], (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getZipCodes,
    getZipCodesByZip
}