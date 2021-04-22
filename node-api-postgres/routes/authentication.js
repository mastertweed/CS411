const db = require('../db/db')

const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';


// USERS Functions
//

// When user attempts to login
const loginAuth = (request, response) => {
    const email = request.params.email
    const password = request.params.password

    db.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (err, results) => { // Query database for user that matches email and password
        if (err) {
            response.send('Username or password incorrect')
        }

        const accessToken = jwt.sign({ email: email }, accessTokenSecret, { expiresIn: '30m' }) // Create jwt token that expires in 30 mins

        response.status(200).json({ accessToken }); // Send the token back to the user
    })
}

// Authenticate user credentials
const authenticateUser = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (authHeader) { // If authorization header exists
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, email) => { // Verify token is correct
            if (err) {
                return response.status(403).send("User Authentication Failed"); // If token is not verified then return and send err message
            }

            request.email = email
            next() // Token verified, continue to next middleware
        })
    } else {
        response.status(401); // Authorization header does not exist
    }
};



module.exports = {
    loginAuth,
    authenticateUser
}