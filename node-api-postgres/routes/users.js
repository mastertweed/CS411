const db = require('../db/db')

// USERS Functions
//
const getUsers = (request, response) => {
    db.query('SELECT * FROM users ORDER BY email ASC', (err, results) => {
        if (err) {
            return response.status(404).send(err)
        }
        response.status(200).json(results.rows)
    })
}

const getUserByEmail = (request, response) => {
    const email = request.params.email

    db.query('SELECT * FROM users WHERE email = $1', [email], (err, results) => {
        if (err) {
            return response.status(404).send(err)
        }
        response.status(200).json(results.rows)
    })
}

// Create user, userinfo and preference all at once (maybe stored procedure)
const createUser = (request, response) => {
    const { email, password } = request.body

    db.query('INSERT INTO users(email, password) VALUES ($1, $2)', [email, password], (err, results) => {
        if (err) {
            return response.status(404).send(err)
        }
        response.status(201).send('User added!')
    })
}

const updateCurrentUser = (request, response) => {
    const email = request.email
    const { email_updated, password } = request.body

    db.query(
        'UPDATE users SET email = $1, password = $2 WHERE email = $3', [email_updated, password, email],
        (err, results) => {
            if (err) {
                return response.status(404).send(err)
            }
            response.status(200).send('User modified with Email: ${email}')
        }
    )
}

const deleteCurrentUser = (request, response) => {
    const email = request.email

    db.query('DELETE FROM users WHERE email = $1', [email], (err, results) => {
        if (err) {
            return response.status(404).send(err)
        }
        response.status(200).send('User deleted with Email: ${email}')
    })
}

// Admin functions
const updateUser = (request, response) => {
    const email = request.params.email
    const { email_updated, password } = request.body

    db.query(
        'UPDATE users SET email = $1, password = $2 WHERE email = $3', [email_updated, password, email],
        (err, results) => {
            if (err) {
                return response.status(404).send(err)
            }
            response.status(200).send('User modified with Email: ${email}')
        }
    )
}

const deleteUser = (request, response) => {
    const email = request.params.email

    db.query('DELETE FROM users WHERE email = $1', [email], (err, results) => {
        if (err) {
            return response.status(404).send(err)
        }
        response.status(200).send('User deleted with Email: ${email}')
    })
}

module.exports = {
    getUsers,
    getUserByEmail,
    createUser,
    updateCurrentUser,
    deleteCurrentUser,
    updateUser,
    deleteUser
}