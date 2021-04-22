const db = require('../db/db')

// USERPREFERENCE Functions
//
const getUserPreference = (request, response) => {
    db.query('SELECT * FROM userpreference ORDER BY email ASC', (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

const getUserPreferenceByEmail = (request, response) => {
    const email = request.params.email

    db.query('SELECT * FROM userpreference WHERE email = $1', [email], (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUserPreference,
    getUserPreferenceByEmail
}