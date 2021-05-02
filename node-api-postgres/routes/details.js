const db = require('../db/db')

const url = require('url')

function executeMultipleQueries(request) {

  //console.log(request)
  const queryObject = url.parse(request.url, true).query;
  //console.log(queryObject);

  city = '%'
  if (queryObject.city) {
      city = queryObject.city
  }

  state = '%'
  if (queryObject.state) {
      state = queryObject.state
  }

  county = '%'
  if (queryObject.county) {
      county = queryObject.county
  }

  console.log(city, ",", state, ",", county)

  var promises = [];

  // Res: 0
  promises.push(new Promise(function(resolve,request){
                db.query('SELECT price AS onebedprice FROM onebedroomprice WHERE city = $1 AND state = $2 AND county = $3', [city, state, county], (err, results) => {
                        if (err) {
                                throw err
                        }
                        resolve(results.rows)
});
        }));

  // Res: 1
  promises.push(new Promise(function(resolve,request){
                db.query('SELECT price AS twobedprice FROM twobedroomprice WHERE city = $1 AND state = $2 AND county = $3', [city, state, county], (err, results) => {
                        if (err) {
                                throw err
                        }
                        resolve(results.rows)
});
        }));

  // Res: 2
  promises.push(new Promise(function(resolve,request){
                db.query('SELECT price AS threebedprice FROM threebedroomprice WHERE city = $1 AND state = $2 AND county = $3', [city, state, county], (err, results) => {
                        if (err) {
                                throw err
                        }
                        resolve(results.rows)
});
        }));

  // Res: 3
  promises.push(new Promise(function(resolve,request){
                db.query('SELECT price AS fourbedprice FROM fourbedroomprice WHERE city = $1 AND state = $2 AND county = $3', [city, state, county], (err, results) => {
                        if (err) {
                                throw err
                        }
                        resolve(results.rows)
});
        }));

  // Res: 4
  promises.push(new Promise(function(resolve,request){
                db.query('SELECT price AS fiveormorebedprice FROM fiveormorebedroomprice WHERE city = $1 AND state = $2 AND county = $3', [city, state, county], (err, results) => {
                        if (err) {
                                throw err
                        }
                        resolve(results.rows)
});
        }));

  // Res: 5
  promises.push(new Promise(function(resolve,request){
                db.query('SELECT price AS singlefamilyresidenceprice FROM singlefamilyresidenceprice WHERE city = $1 AND state = $2 AND county = $3', [city, state, county], (err, results) => {
                        if (err) {
                                throw err
                        }
                        resolve(results.rows)
});
        }));

  // Res: 6
  promises.push(new Promise(function(resolve,request){
                db.query('SELECT population, under18, over65, median_age, hs_grad, some_college, associates_degree, bachelors_degree, grad_degree, mean_earnings, per_capita_income, ansi_state, ansi_place FROM census WHERE city = $1 AND state = $2', [city, state], (err, results) => {
                        if (err) {
                                throw err
                        }
                        resolve(results.rows)
                });
        }));

  // Res: 7
  promises.push(new Promise(function(resolve,request){
                db.query('SELECT days AS rainfall_days, inch AS rainfall_inch, milli AS rainfall_milli FROM rainfall WHERE city = $1 AND state = $2', [city, state], (err, results) => {
                        if (err) {
                                throw err
                        }
                        resolve(results.rows)
                });
        }));

  // Res: 8
  promises.push(new Promise(function(resolve,request){
                db.query('SELECT avg_f AS average_temp FROM temperature WHERE county = $1 AND state = $2', [county, state], (err, results) => {
                        if (err) {
                                throw err
                        }
                        resolve(results.rows)
                });
        }));

  // Res: 9
  promises.push(new Promise(function(resolve,request){
                db.query('SELECT taxrate, bracket_single, bracket_married FROM incometax WHERE stateid = (SELECT stateid FROM states WHERE state = $1)', [state], (err, results) => {
                        if (err) {
                                throw err
                        }
                        resolve(results.rows)
                });
        }));

  // Res: 10
  promises.push(new Promise(function(resolve,request){
                db.query('SELECT deduction_single, deduction_married FROM standardded WHERE stateid = (SELECT stateid FROM states WHERE state = $1)', [state], (err, results) => {
                        if (err) {
				console.log(err)
                                throw err
                        }
                        resolve(results.rows)
                });
        }));

  // Res: 11
  promises.push(new Promise(function(resolve,request){
        var mdb = db.getmdb();
	mdb.collection('incentives')
         .aggregate([{$match:{State:state}}, {$project:{"_id":0, "country":0, "min_value":0, "max_value":0,  "State":0, "City":0}}])
         .toArray(function (err, items) {
		resolve(items)
            })
        }));
  

  return Promise.all(promises)
}


const getDetails = (request, response) => {
        executeMultipleQueries(request).then( function(results) {
		final = []
                final = final.concat(results[0], results[1], results[2], results[3], results[4], results[5]);
                final = final.concat(results[6], results[7], results[8], results[9], results[10], results[11]);
                response.status(200).json(final);
                //console.log("res0", results[0]);
                //console.log("res1", results[1]);
                //console.log("res2", results[2]);
                //console.log("res3", results[3]);
        })
        //console.log("test")
}

module.exports = {
    getDetails
}
