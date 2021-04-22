const db = require('../db/db')

const url = require('url')


// RESULTS FUNCTIONS
//
const getPreferredResult = async(request, response) => {
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

    final = ""
    if (onebedroom) {
        results = await db.query('SELECT * FROM onebedroomprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', [state, city, minprice, maxprice])
        for (var i = 0; i < results.rows.length; i++) {
            results.rows[i]["type"] = "One-Bedroom"
        }
        final = results.rows
    }

    if (twobedroom) {
        results = await db.query('SELECT * FROM twobedroomprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', [state, city, minprice, maxprice])
        for (var i = 0; i < results.rows.length; i++) {
            results.rows[i]["type"] = "Two-Bedrooms"
        }
        if (final == "") {
            final = results.rows
        } else {
            final = final.concat(results.rows)
        }
    }

    if (threebedroom) {
        results = await db.query('SELECT * FROM threebedroomprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', [state, city, minprice, maxprice])
        for (var i = 0; i < results.rows.length; i++) {
            results.rows[i]["type"] = "Three-Bedrooms"
        }
        if (final == "") {
            final = results.rows
        } else {
            final = final.concat(results.rows)
        }
    }
    if (fourbedroom) {
        results = await db.query('SELECT * FROM fourbedroomprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', [state, city, minprice, maxprice])
        for (var i = 0; i < results.rows.length; i++) {
            results.rows[i]["type"] = "Four-Bedrooms"
        }
        if (final == "") {
            final = results.rows
        } else {
            final = final.concat(results.rows)
        }
    }
    if (fiveormorebedroom) {
        results = await db.query('SELECT * FROM fiveormorebedroomprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', [state, city, minprice, maxprice])
        for (var i = 0; i < results.rows.length; i++) {
            results.rows[i]["type"] = "FiveOrMore-Bedrooms"
        }
        if (final == "") {
            final = results.rows
        } else {
            final = final.concat(results.rows)
        }
    }
    if (singlefamilyresidence) {
        results = await db.query('SELECT * FROM singlefamilyresidenceprice WHERE state LIKE $1 AND city LIKE $2 AND price > $3 AND price < $4', [state, city, minprice, maxprice])
        for (var i = 0; i < results.rows.length; i++) {
            results.rows[i]["type"] = "Single Family"
        }
        if (final == "") {
            final = results.rows
        } else {
            final = final.concat(results.rows)
        }
    }
    response.status(200).json(final)
}

module.exports = {
    getPreferredResult
}