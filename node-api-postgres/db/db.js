const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    // AWS
    host: 'cs411-postgres-1.cwg7ctu1vqsd.us-east-1.rds.amazonaws.com',
    database: 'postgres',
    password: 'postgrespassword',
    // Local
    //  host: 'localhost',
    //  database: 'api',
    //  password: 'password',
    port: 5432,
})

module.exports = {
    query: (text, params, callback) => {
        const start = Date.now()
        return pool.query(text, params, (err, res) => {
            const duration = Date.now() - start
            console.log('executed query', { text, duration, rows: res.rowCount })
            callback(err, res)
        })
    },
}