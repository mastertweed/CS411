const db = require('../db/db')

// HOUSING Functions
//
const getOneBedroomPrice = (request, response) => {
    db.query('SELECT * FROM onebedroomprice', (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

const getTwoBedroomPrice = (request, response) => {
    db.query('SELECT * FROM twobedroomprice', (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

const getThreeBedroomPrice = (request, response) => {
    db.query('SELECT * FROM threebedroomprice', (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

const getFourBedroomPrice = (request, response) => {
    db.query('SELECT * FROM fourbedroomprice', (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

const getFiveMoreBedroomPrice = (request, response) => {
    db.query('SELECT * FROM fiveormorebedroomprice', (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

const getSingleFamilyResidencePrice = (request, response) => {
    db.query('SELECT * FROM singlefamilyresidenceprice', (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getOneBedroomPrice,
    getTwoBedroomPrice,
    getThreeBedroomPrice,
    getFourBedroomPrice,
    getFiveMoreBedroomPrice,
    getSingleFamilyResidencePrice
}