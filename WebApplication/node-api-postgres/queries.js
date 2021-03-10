const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

// USERS Functions
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { user_name, income, city, age, password } = request.body

  pool.query('INSERT INTO users(user_name, income, city, age, password) VALUES ($1, $2, $3, $4, $5)', [user_name, income, city, age, password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { user_name, income, city, age, password } = request.body

  pool.query(
    'UPDATE users SET user_name = $1, income = $2, city = $3, age = $4, password = $5 WHERE user_id = $6',
    [user_name, income, city, age, password, user_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

// LOCATIONS Functions
const getLocations = (request, response) => {
  pool.query('SELECT * FROM locations ORDER BY state_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// CITY Functions
const getCity = (request, response) => {
  pool.query('SELECT * FROM city ORDER BY city_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// CLIMATE Functions
const getClimate = (request, response) => {
  pool.query('SELECT * FROM climate ORDER BY city_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// HOUSING Functions
const getHousing = (request, response) => {
  pool.query('SELECT * FROM housing ORDER BY county_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// INCENTIVES Functions
const getIncentives = (request, response) => {
  pool.query('SELECT * FROM incentives ORDER BY city_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// PREFERS Functions
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
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getLocations,
  getCity,
  getClimate,
  getHousing,
  getIncentives,
  getPrefers
}