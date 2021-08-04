const db = require('../db/db')

// USERINFO Functions
//
const getUserInfo = (request, response) => {
    db.query('SELECT * FROM userinfo ORDER BY email ASC', (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

const getUserInfoByEmail = (request, response) => {
    const email = request.params.email
    
    db.query('SELECT * FROM userinfo WHERE email = $1', [email], (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows)
    })
}

const createUserInfo = (request, response) => {
    const { email, firstname, lastname, city, state, zipcode } = request.body

    db.query('INSERT INTO userinfo(email, firstname, lastname, city, state, zipcode) VALUES ($1, $2, $3, $4, $5, $6)', [email, firstname, lastname, city, state, zipcode], (err, results) => {
        if (err) {
            throw err
        }
        response.status(201).send('User-Info added!')
    })
}

const updateUserInfo = (request, response) => {
    const email = request.params.email
    const { firstname, lastname, city, state, zipcode } = request.body

    db.query('UPDATE userinfo SET firstname = $2, lastname = $3, city = $4, state = $5, zipcode = $6 WHERE email = $1', [email, firstname, lastname, city, state, zipcode], (err, results) => {
        if (err) {
            throw err
        }
        response.status(201).send('User-Info updated!')
    })
}

module.exports = {
    getUserInfo,
    getUserInfoByEmail,
    createUserInfo,
    updateUserInfo
}