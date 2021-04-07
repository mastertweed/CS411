const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'cs411-postgres-1.cwg7ctu1vqsd.us-east-1.rds.amazonaws.com',
  database: 'postgres',
  password: 'postgrespassword',
//  host: 'localhost',
//  database: 'api',
//  password: 'password',
  port: 5432,
})


const getHousingInfoBasedOnPrefs = (request, response) => {
  const city = request.params.city
  const state = request.params.state
  const minPrice = request.params.minPrice
  const maxPrice = request.params.maxPrice
  const numBedrooms = request.params.bedrooms

  if (numBedrooms == 2) {
      pool.query('SELECT * FROM 2BedroomPrice WHERE City = city && State = state && Price >= minPrice && Price <= maxPrice ORDER BY Price ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
}

// USERS Functions
//
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY email ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserByEmail = (request, response) => {
  const email = request.params.email

  pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { email, password } = request.body

  pool.query('INSERT INTO users(email, password) VALUES ($1, $2)', [email, password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('User added!')
  })
}

const updateUser = (request, response) => {
  const email = request.params.email
  const { email_updated, password } = request.body

  pool.query(
    'UPDATE users SET email = $1, password = $2 WHERE email = $3',
    [email_updated, password, email],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send('User modified with Email: ${email}')
    }
  )
}

const deleteUser = (request, response) => {
  const email = request.params.email

  pool.query('DELETE FROM users WHERE email = $1', [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('User deleted with Email: ${email}')
  })
}

// USERINFO Functions
//
const getUserInfo = (request, response) => {
  pool.query('SELECT * FROM userinfo ORDER BY email ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUserInfo = (request, response) => {
  const { email, firstname, lastname, city, state, zipcode } = request.body

  pool.query('INSERT INTO userinfo(email, firstname, lastname, city, state, zipcode) VALUES ($1, $2, $3, $4, $5, $6)', [email, firstname, lastname, city, state, zipcode], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('User-Info added!')
  })
}

// USERPREFERENCE Functions
//
const getUserPreference = (request, response) => {
  pool.query('SELECT * FROM userpreference ORDER BY email ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


// CITY Functions
//
const getCity = (request, response) => {
  pool.query('SELECT * FROM city ORDER BY city_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// ZIPCODES Functions
//
const getZipCodes = (request, response) => {
  pool.query('SELECT * FROM zipcodes', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// STATES Functions
//
const getStates = (request, response) => {
  pool.query('SELECT * FROM states', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// TEMPERATURE Functions
//
const getTemperature = (request, response) => {
  pool.query('SELECT * FROM temperature', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// RAINFALL Functions
//
const getRainfall = (request, response) => {
  pool.query('SELECT * FROM rainfall', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// CENSUS Functions
//
const getCensus = (request, response) => {
  pool.query('SELECT * FROM census', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// INCOMETAX Functions
//
const getIncomeTax = (request, response) => {
  pool.query('SELECT * FROM incometax', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// STANDARDDED Functions
//
const getStandardDed = (request, response) => {
  pool.query('SELECT * FROM standardded', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// HOUSING Functions
//
const getOneBedroomPrice = (request, response) => {
  pool.query('SELECT * FROM onebedroomprice', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTwoBedroomPrice = (request, response) => {
  pool.query('SELECT * FROM twobedroomprice', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getThreeBedroomPrice = (request, response) => {
  pool.query('SELECT * FROM threebedroomprice', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getFourBedroomPrice = (request, response) => {
  pool.query('SELECT * FROM fourbedroomprice', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getFiveMoreBedroomPrice = (request, response) => {
  pool.query('SELECT * FROM fiveormorebedroomprice', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSingleFamilyResidencePrice = (request, response) => {
  pool.query('SELECT * FROM singlefamilyresidenceprice', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// INCENTIVES Functions
//
const getIncentives = (request, response) => {
  pool.query('SELECT * FROM incentives ORDER BY city_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// PREFERS Functions
//
const getPrefers = (request, response) => {
  pool.query('SELECT * FROM prefers ORDER BY user_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getUserInfo,
  createUserInfo,
  getCity,
  getZipCodes,
  getStates,
  getTemperature,
  getRainfall,
  getCensus,
  getIncomeTax,
  getStandardDed,
  getOneBedroomPrice,
  getTwoBedroomPrice,
  getThreeBedroomPrice,
  getFourBedroomPrice,
  getFiveMoreBedroomPrice,
  getSingleFamilyResidencePrice,
  getIncentives,
  getPrefers
}
