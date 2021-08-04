const db = require('../db/db')

const url = require('url')

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
    console.log(email)

    db.query('SELECT * FROM userpreference WHERE email = $1', [email], (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

const updateUserPreferenceByEmail = (request, response) => {

    const queryObject = url.parse(request.url, true).query;
    console.log(queryObject);

    email = queryObject.email
    min_cost = queryObject.min_cost
    max_cost = queryObject.max_cost
    bedrooms1 = queryObject.bedrooms1
    bedrooms2 = queryObject.bedrooms2
    bedrooms3 = queryObject.bedrooms3
    bedrooms4 = queryObject.bedrooms4
    bedrooms5 = queryObject.bedrooms5
    singlefamily = queryObject.singlefamily
    zipcode = queryObject.zipcode
    maxdist = queryObject.maxdist
    min_temp = queryObject.min_temp
    max_temp = queryObject.max_temp


    db.query('UPDATE userpreference SET min_cost = $1, max_cost = $2, bedrooms1 = $3, bedrooms2 = $4, ' +
        'bedrooms3 = $5, bedrooms4 = $6, bedrooms5 = $7, singlefamily = $8, zipcode = $9, maxdist = $10, ' +
        'min_temp = $11, max_temp = $12 WHERE email = $13', [min_cost, max_cost, bedrooms1, bedrooms2, bedrooms3, bedrooms4, bedrooms5, singlefamily, zipcode, maxdist, min_temp, max_temp, email], (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).send("UPDATED userpreference")
    })
}

const createUserPreferenceByEmail = (request, response) => {

    const queryObject = url.parse(request.url, true).query;
    console.log(queryObject);

    email = queryObject.email
    min_cost = queryObject.min_cost
    max_cost = queryObject.max_cost
    bedrooms1 = queryObject.bedrooms1
    bedrooms2 = queryObject.bedrooms2
    bedrooms3 = queryObject.bedrooms3
    bedrooms4 = queryObject.bedrooms4
    bedrooms5 = queryObject.bedrooms5
    singlefamily = queryObject.singlefamily
    zipcode = queryObject.zipcode
    maxdist = queryObject.maxdist
    min_temp = queryObject.min_temp
    max_temp = queryObject.max_temp


    db.query('INSERT INTO userpreference (email, min_cost, max_cost, bedrooms1, bedrooms2, bedrooms3, bedrooms4, '+
        'bedrooms5, singlefamily, zipcode, maxdist, min_temp, max_temp) ' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [email, min_cost, max_cost, bedrooms1, bedrooms2, bedrooms3, bedrooms4, bedrooms5, singlefamily, zipcode, maxdist, min_temp, max_temp], (err, results) => {
        if (err) {
            throw err
        }
        response.status(201).send("CREATED userpreference")
    })
}

module.exports = {
    getUserPreference,
    getUserPreferenceByEmail,
    updateUserPreferenceByEmail,
    createUserPreferenceByEmail
}