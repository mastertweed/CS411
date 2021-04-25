const db = require('../db/db')

const url = require('url')

// RESULTS FUNCTIONS
//
const getPreferredResult = async (request, response) => {
    // Save all params
    const queryObject = url.parse(request.url, true).query;
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

    // $1 = state, $2 = city, $3 = minprice, $4 = maxprice, $5 = mintemp, $6 = maxtemp
    // $7 = onebed, $8 = twobed, $9 = threebed, $10 = fourbed, $11 = fivebed, $12 = singlefamily
    db.query(
	'(SELECT A.state, A.county, A.city, \'One-Bedroom\' AS HouseType, A.price, ' +
	        'C.median_age, C.mean_earnings, C.per_capita_income, T.avg_f AS avg_temp ' + 
         'FROM onebedroomprice AS A, census AS C, Temperature AS T ' +
	 'WHERE A.state LIKE $1 AND A.city LIKE $2 AND A.price > $3 AND A.price < $4 ' +
               'AND C.city = A.city AND C.state = A.state ' +
	       'AND T.county = A.county AND T.state = A.state ' +
               'AND T.avg_f > $5 AND T.avg_f < $6 AND $7 = 1) ' +

     'UNION ' +

	'(SELECT A.state, A.county, A.city, \'Two-Bedroom\' AS HouseType, A.price, ' +
                'C.median_age, C.mean_earnings, C.per_capita_income, T.avg_f AS avg_temp ' +
         'FROM twobedroomprice AS A, census AS C, Temperature AS T ' +
         'WHERE A.state LIKE $1 AND A.city LIKE $2 AND A.price > $3 AND A.price < $4 ' +
               'AND C.city = A.city AND C.state = A.state ' +
               'AND T.county = A.county AND T.state = A.state ' +
               'AND T.avg_f > $5 AND T.avg_f < $6 AND $8 = 1) ' +

     'UNION ' +

	'(SELECT A.state, A.county, A.city, \'Three-Bedroom\' AS HouseType, A.price, ' +
                'C.median_age, C.mean_earnings, C.per_capita_income, T.avg_f AS avg_temp ' +
         'FROM threebedroomprice AS A, census AS C, Temperature AS T ' +
         'WHERE A.state LIKE $1 AND A.city LIKE $2 AND A.price > $3 AND A.price < $4 ' +
               'AND C.city = A.city AND C.state = A.state ' +
               'AND T.county = A.county AND T.state = A.state ' +
               'AND T.avg_f > $5 AND T.avg_f < $6 AND $9 = 1) ' +

     'UNION ' +

	'(SELECT A.state, A.county, A.city, \'Four-Bedroom\' AS HouseType, A.price, ' +
                'C.median_age, C.mean_earnings, C.per_capita_income, T.avg_f AS avg_temp ' +
         'FROM fourbedroomprice AS A, census AS C, Temperature AS T ' +
         'WHERE A.state LIKE $1 AND A.city LIKE $2 AND A.price > $3 AND A.price < $4 ' +
               'AND C.city = A.city AND C.state = A.state ' +
               'AND T.county = A.county AND T.state = A.state ' +
               'AND T.avg_f > $5 AND T.avg_f < $6 AND $10 = 1) ' +

     'UNION ' +

	'(SELECT A.state, A.county, A.city, \'FivePlus-Bedroom\' AS HouseType, A.price, ' +
                'C.median_age, C.mean_earnings, C.per_capita_income, T.avg_f AS avg_temp ' +
         'FROM fiveormorebedroomprice AS A, census AS C, Temperature AS T ' +
         'WHERE A.state LIKE $1 AND A.city LIKE $2 AND A.price > $3 AND A.price < $4 ' +
               'AND C.city = A.city AND C.state = A.state ' +
               'AND T.county = A.county AND T.state = A.state ' +
               'AND T.avg_f > $5 AND T.avg_f < $6 AND $11 = 1) ' +

     'UNION ' +

	'(SELECT A.state, A.county, A.city, \'SingleFamilyResidence\' AS HouseType, A.price, ' +
                'C.median_age, C.mean_earnings, C.per_capita_income, T.avg_f AS avg_temp ' +
         'FROM singlefamilyresidenceprice AS A, census AS C, Temperature AS T ' +
         'WHERE A.state LIKE $1 AND A.city LIKE $2 AND A.price > $3 AND A.price < $4 ' +
               'AND C.city = A.city AND C.state = A.state ' +
               'AND T.county = A.county AND T.state = A.state ' +
               'AND T.avg_f > $5 AND T.avg_f < $6 AND $12 = 1) ' +
	 'ORDER BY state, county, city, housetype ASC',

	 [state, city, minprice, maxprice, mintemp, maxtemp,
	  onebedroom,twobedroom,threebedroom,fourbedroom,fiveormorebedroom,singlefamilyresidence], 
        (err, results) => {
            if (err) {
                throw err
            }
            console.log(results.rows)
// Begin Scoring Results
            price_range = maxprice - minprice
            for (var i = 0; i < results.rows.length; i++) {
                price_offset = results.rows[i].price - minprice
                calculated_score = ( 1 - ( price_offset / price_range ) ) * 100
                results.rows[i]["score"] = calculated_score
            }
// End Scoring Results
            response.status(200).json(results.rows)
        })

    

    // Begin querying each housing table
    // final = ""
    // if (onebedroom) {
    //     results = await db.query('SELECT * FROM onebedroomprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', 
    //  [state, city, minprice, maxprice], 
    //    (err, results) => {
    //        if (err) {
    //            throw err
    //        }
    //         for (var i = 0; i < results.rows.length; i++) {
    //             results.rows[i]["type"] = "One-Bedrooms"
    //         }
    //         if (final == "") {
    //             final = results.rows
    //         } else {
    //             final = final.concat(results.rows)
    //         }
    //    })
    //}    

    // if (twobedroom) {
    //     results = await db.query('SELECT * FROM twobedroomprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', 
    //     [state, city, minprice, maxprice], 
    //     (err) => {
    //         if (err) {
    //             throw err
    //         }
    //         for (var i = 0; i < results.rows.length; i++) {
    //             results.rows[i]["type"] = "Two-Bedrooms"
    //         }
    //         if (final == "") {
    //             final = results.rows
    //         } else {
    //             final = final.concat(results.rows)
    //         }
    //     })
    // }

    // if (threebedroom) {
    //     results = await db.query('SELECT * FROM threebedroomprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', 
    //     [state, city, minprice, maxprice], 
    //     (err, results) => {
    //         if (err) {
    //             throw err
    //         }
    //         for (var i = 0; i < results.rows.length; i++) {
    //             results.rows[i]["type"] = "Three-Bedrooms"
    //         }
    //         if (final == "") {
    //             final = results.rows
    //         } else {
    //             final = final.concat(results.rows)
    //         }
    //     })
    // }

    // if (fourbedroom) {
    //     results = await db.query('SELECT * FROM fourbedroomprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', 
    //     [state, city, minprice, maxprice], 
    //     (err, results) => {
    //         if (err) {
    //             throw err
    //         }
    //         for (var i = 0; i < results.rows.length; i++) {
    //             results.rows[i]["type"] = "Four-Bedrooms"
    //         }
    //         if (final == "") {
    //             final = results.rows
    //         } else {
    //             final = final.concat(results.rows)
    //         }
    //     })
    // }

    // if (fiveormorebedroom) {
    //     results = await db.query('SELECT * FROM fiveormorebedroomprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', 
    //     [state, city, minprice, maxprice], 
    //     (err, results) => {
    //         if (err) {
    //             throw err
    //         }
    //         for (var i = 0; i < results.rows.length; i++) {
    //             results.rows[i]["type"] = "FiveorMore-Bedrooms"
    //         }
    //         if (final == "") {
    //             final = results.rows
    //         } else {
    //             final = final.concat(results.rows)
    //         }
    //     })
    // }

    // if (singlefamilyresidence) {
    //     results = await db.query('SELECT * FROM singlefamilyresidenceprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', 
    //     [state, city, minprice, maxprice], 
    //     (err, results) => {
    //         if (err) {
    //             throw err
    //         }
    //         for (var i = 0; i < results.rows.length; i++) {
    //             results.rows[i]["type"] = "FiveorMore-Bedrooms"
    //         }
    //         if (final == "") {
    //             final = results.rows
    //         } else {
    //             final = final.concat(results.rows)
    //         }
    //     })
    // }
    // response.status(200).json(final)
}


module.exports = {
    getPreferredResult
}
