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

const url = require('url')

const getPreferredResult = async (request, response) => {
  const queryObject = url.parse(request.url,true).query;
  console.log(queryObject);

  city = '%'
  if (queryObject.city) {
    city = queryObject.city
  }

  state = '%'
  if (queryObject.state) {
    state = queryObject.state
  }

  mintemp = -100
  if (queryObject.mintemp) {
    mintemp = queryObject.mintemp
  }

  maxtemp = 500
  if (queryObject.maxtemp) {
    maxtemp = queryObject.maxtemp
  }

  minprice = 0
  if (queryObject.minprice) {
    minprice = queryObject.minprice
  }

  maxprice = 100000000
  if (queryObject.maxprice) {
    maxprice = queryObject.maxprice
  }

  onebedroom = 0
  if (queryObject.onebed) {
    onebedroom = queryObject.onebed
  }
  twobedroom = 0
  if (queryObject.twobed) {
    twobedroom = queryObject.twobed
  }
  threebedroom = 0
  if (queryObject.threebed) {
    threebedroom = queryObject.threebed
  }
  fourbedroom = 0
  if (queryObject.fourbed) {
    fourbedroom = queryObject.fourbed
  }
  fiveormorebedroom = 0
  if (queryObject.fiveplusbed) {
    fiveormorebedroom = queryObject.fiveplusbed
  }
  singlefamilyresidence = 0
  if (queryObject.singlefamily) {
    singlefamilyresidence = queryObject.singlefamily
  }

  final = ""
  if (onebedroom) {
      results = await pool.query('SELECT * FROM onebedroomprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', [state, city, minprice, maxprice])
      for (var i = 0; i < results.rows.length; i++) { 
  	results.rows[i]["type"] = "One-Bedroom" 
      }
      final = results.rows
  }

  if (twobedroom) {
      results = await pool.query('SELECT * FROM twobedroomprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', [state, city, minprice, maxprice])
      for (var i = 0; i < results.rows.length; i++) { 
  	results.rows[i]["type"] = "Two-Bedrooms" 
      }
      if ( final == "" ) {
	final = results.rows
      } else {
        final = final.concat(results.rows)
      }
  }

  if (threebedroom) {
      results = await pool.query('SELECT * FROM threebedroomprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', [state, city, minprice, maxprice])
      for (var i = 0; i < results.rows.length; i++) { 
  	results.rows[i]["type"] = "Three-Bedrooms" 
      }
      if ( final == "" ) {
	final = results.rows
      } else {
        final = final.concat(results.rows)
      }
  }
  if (fourbedroom) {
      results = await pool.query('SELECT * FROM fourbedroomprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', [state, city, minprice, maxprice])
      for (var i = 0; i < results.rows.length; i++) { 
  	results.rows[i]["type"] = "Four-Bedrooms" 
      }
      if ( final == "" ) {
	final = results.rows
      } else {
        final = final.concat(results.rows)
      }
  }
  if (fiveormorebedroom) {
      results = await pool.query('SELECT * FROM fiveormorebedroomprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', [state, city, minprice, maxprice])
      for (var i = 0; i < results.rows.length; i++) { 
  	results.rows[i]["type"] = "FiveOrMore-Bedrooms" 
      }
      if ( final == "" ) {
	final = results.rows
      } else {
        final = final.concat(results.rows)
      }
  }
  if (singlefamilyresidence) {
      results = await pool.query('SELECT * FROM singlefamilyresidenceprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', [state, city, minprice, maxprice])
      for (var i = 0; i < results.rows.length; i++) { 
  	results.rows[i]["type"] = "Single Family" 
      }
      if ( final == "" ) {
	final = results.rows
      } else {
        final = final.concat(results.rows)
      }
  }
  response.status(200).json(final)
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

const getUserPreferenceByEmail = (request, response) => {
  const email = request.params.email

  pool.query('SELECT * FROM userpreference WHERE email = $1', [email], (error, results) => {
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

const getZipCodesByZip = (request, response) => {
  const zip = parseInt(request.params.zip)

  pool.query('SELECT * FROM zipcodes WHERE zip = $1', [zip], (error, results) => {
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

const getTemperatureByCity = (request, response) => {
  const city = request.params.city

  pool.query('SELECT * FROM temperature WHERE city = $1', [city], (error, results) => {
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

const getRainfallByCity = (request, response) => {
  const city = request.params.city

  pool.query('SELECT * FROM rainfall WHERE city = $1', [city], (error, results) => {
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

const getCensusByCityState = (request, response) => {
  const city = request.params.city
  const state = request.params.state

  pool.query('SELECT * FROM census WHERE city = $1 AND state = $2', [city, state], (error, results) => {
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

module.exports = {
  getUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getUserInfo,
  createUserInfo,
  getUserPreference,
  getUserPreferenceByEmail,
  getCity,
  getZipCodes,
  getZipCodesByZip,
  getStates,
  getTemperature,
  getTemperatureByCity,
  getRainfall,
  getRainfallByCity,
  getCensus,
  getCensusByCityState,
  getIncomeTax,
  getStandardDed,
  getOneBedroomPrice,
  getTwoBedroomPrice,
  getThreeBedroomPrice,
  getFourBedroomPrice,
  getFiveMoreBedroomPrice,
  getSingleFamilyResidencePrice,
  getIncentives,
  getPreferredResult
}
