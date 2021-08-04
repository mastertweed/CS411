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

// const mongodb = require('mongodb')
// const connectionString = "mongodb+srv://mongo:mongopassword@cluster0.eyazr.mongodb.net/db?retryWrites=true&w=majority";
// let mdb
// mongodb.connect(
//   connectionString,
//   { useNewUrlParser: true, useUnifiedTopology:true },
//   function (err, client) {
//     if (err) {
//       throw err;
//     }
//     mdb = client.db();
//   }
// )


module.exports = {
    query: (text, params, callback) => {
        const start = Date.now()
        return pool.query(text, params, (err, res) => {
            const duration = Date.now() - start
            console.log('executed query', { text, duration, rows: res.rowCount })
            callback(err, res)
        })
    },

    query2: (text, params) => {
        return pool.query(text, params);
    },
   
    getmdb: function() {
	return mdb;
    }
}
