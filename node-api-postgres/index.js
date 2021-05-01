const express = require('express')
const bodyParser = require('body-parser')
const app = express()


// const db = require('./db/queries')
const censusRoute = require('./routes/census')
const housingRoute = require('./routes/housing')
const incometaxRoute = require('./routes/incometax')
const rainfallRoute = require('./routes/rainfall')
const resultsRoute = require('./routes/results')
const standarddedRoute = require('./routes/standardded')
const statesRoute = require('./routes/states')
const temperatureRoute = require('./routes/temperature')
const userinfoRoute = require('./routes/userinfo')
const userpreferenceRoute = require('./routes/userpreference')
const usersRoute = require('./routes/users')
const zipcodesRoute = require('./routes/zipcodes')
const authenticationRoute = require('./routes/authentication')
const detailRoute = require('./routes/details')

const mongodb = require('mongodb')
const connectionString = "mongodb+srv://mongo:mongopassword@cluster0.eyazr.mongodb.net/db?retryWrites=true&w=majority";
let mdb
mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology:true },
  function (err, client) {
    if (err) {
      throw err;
    }
    mdb = client.db();
  }
)

// Set correct port based on enviorment
const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Add headers for access
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Request-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

// Parsing middleware
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)

// Checking nodejs server 
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

// Postgres
//
// Restricted (Authenticate user before allowing access)
app.get('/login', authenticationRoute.loginAuth)

app.get('/census', censusRoute.getCensus)
app.get('/census/:city/:state', censusRoute.getCensusByCityState)

app.get('/onebedroomprice', housingRoute.getOneBedroomPrice)
app.get('/twobedroomprice', housingRoute.getTwoBedroomPrice)
app.get('/threebedroomprice', housingRoute.getThreeBedroomPrice)
app.get('/fourbedroomprice', housingRoute.getFourBedroomPrice)
app.get('/fivemorebedroomprice', housingRoute.getFiveMoreBedroomPrice)
app.get('/singlefamilyresidenceprice', housingRoute.getSingleFamilyResidencePrice)

app.get('/incometax', incometaxRoute.getIncomeTax)

app.get('/rainfall', rainfallRoute.getRainfall)
app.get('/rainfall/:city', rainfallRoute.getRainfallByCity)

app.get('/preference/results', resultsRoute.getPreferredResult)

app.get('/standardded', standarddedRoute.getStandardDed)

app.get('/states', statesRoute.getStates)

app.get('/temperature', temperatureRoute.getTemperature)
app.get('/temperature/:state/:county', temperatureRoute.getTemperatureByStateCounty)

app.get('/userinfo', [authenticationRoute.authenticateUser, userinfoRoute.getUserInfo]) // Restricted
app.get('/userinfo/:email', userinfoRoute.getUserInfoByEmail)
app.post('/userinfo', userinfoRoute.createUserInfo)
app.post('/userinfo/:email', userinfoRoute.updateUserInfo)
// app.post('/userinfo', [authenticationRoute.authenticateUser, userinfoRoute.createUserInfo]) // Restricted
// app.post('/userinfo/:email', [authenticationRoute.authenticateUser, userinfoRoute.updateUserInfo]) // Restricted
// app.get('/userinfo/:email', [authenticationRoute.authenticateUser, userinfoRoute.getUserInfoByEmail]) // Restricted

app.get('/userpreference', userpreferenceRoute.getUserPreference)
app.get('/userpreference/:email', userpreferenceRoute.getUserPreferenceByEmail)

app.get('/users', usersRoute.getUsers)
app.post('/users', usersRoute.createUser)
app.put('/users', [authenticationRoute.authenticateUser, usersRoute.updateCurrentUser]) // Restricted
app.delete('/users', [authenticationRoute.authenticateUser, usersRoute.deleteCurrentUser]) // Restricted

app.get('/users/:email', usersRoute.getUserByEmail)
// app.get('/users/:email', [authenticationRoute.authenticateUser, usersRoute.getUserByEmail]) // Restricted (admin)
app.put('/users/:email', [authenticationRoute.authenticateUser, usersRoute.updateUser]) // Restricted (admin)
app.delete('/users/:email', [authenticationRoute.authenticateUser, usersRoute.deleteUser]) // Restricted (admin)

app.get('/zipcodes', zipcodesRoute.getZipCodes)
app.get('/zipcodes/:zip', zipcodesRoute.getZipCodesByZip)

app.get('/details', detailRoute.getDetails)

// MongoDB
//
app.get('/incentives', function(req, res) {
    mdb.collection('incentives')
         .aggregate([ {$project:{"_id":0, "country":0, "min_value":0, "max_value":0}}])
         .toArray(function (err, items) {
         // console.log(items)
         res.send(items)
 
         })
 })
 
 app.post('/incentives', function(req, res) {
    //console.log("#####################");
    //console.log(req.body);
    let inputArgs = req.body;
    //let deleteIncentive = inputArgs.mode;
    //let updateIncentive = inputArgs.mode;
 
    if (inputArgs.mode == 1) {
         let state = inputArgs.State;
         let city = inputArgs.City;
         let query = { State:state, City:city };
         // console.log(query);
         mdb.collection("incentives").deleteMany(query, function(err, obj) {
             if (err) throw err;
             console.log(obj.result.n + " document(s) deleted");
         });
    } else if(inputArgs.mode == 2) {
 
     let state = inputArgs.State;
     let city = inputArgs.City;
     let des = inputArgs.description;
     let req = inputArgs.requirements;
     let query = {State:state, City:city};
     let update = {$set: {State:state, City:city, description:des, requirements:req}};
     
     //let arg1 = JSON.stringify(query);
       //let arg2 = JSON.stringify(update);	
 
     //mdb.collection("incentives").update(arg1, arg2, function(err, obj) {
     //mdb.collection("incentives").update(query, update, function(err, obj) {
     //mdb.collection("incentives").updateOne({State:state, City:city}, {$set: {description:des, requirements:req}}, {});
 
     mdb.collection("incentives").updateOne(query, update, {});
 
   } else {
 
     mdb.collection('incentives').insertOne(req.body)
 
   }
 
   mdb.collection('incentives')
         .aggregate([ {$project:{"_id":0, "country":0, "min_value":0, "max_value":0}}])
         .toArray(function (err, items) {
         // console.log(items)
         res.send(items)
         })
 })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
