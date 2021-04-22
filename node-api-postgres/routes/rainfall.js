const db = require('../db/db')

// RAINFALL Functions
//
const getRainfall = (request, response) => {
    db.query('SELECT * FROM rainfall', (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

const getRainfallByCity = (request, response) => {
    const city = request.params.city

    db.query('SELECT * FROM rainfall WHERE city = $1', [city], (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getRainfall,
    getRainfallByCity
}