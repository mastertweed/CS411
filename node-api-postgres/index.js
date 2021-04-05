const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
// const port = 3000

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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATACH, DELETE, OPTIONS'
  );
  next();
});

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:email', db.getUserByEmail)
app.post('/users', db.createUser)
app.put('/users/:email', db.updateUser)
app.delete('/users/:email', db.deleteUser)

app.get('/usersinfo', db.getUserInfo)
app.post('/userinfo', db.createUserInfo)

app.get('/city', db.getCity)
app.get('/zipcodes', db.getZipCodes)
app.get('/states', db.getStates)
app.get('/temperature', db.getTemperature)
app.get('/rainfall', db.getRainfall)

app.get('/census', db.getCensus)
app.get('/incometax', db.getIncomeTax)
app.get('/standardded', db.getStandardDed)

app.get('/onebedroomprice', db.getOneBedroomPrice)
app.get('/twobedroomprice', db.getTwoBedroomPrice)
app.get('/threebedroomprice', db.getThreeBedroomPrice)
app.get('/fourbedroomprice', db.getFourBedroomPrice)
app.get('/fivemorebedroomprice', db.getFiveMoreBedroomPrice)
app.get('/singlefamilyresidenceprice', db.getSingleFamilyResidencePrice)

// app.get('/incentives', db.getIncentives)
// app.get('/prefers', db.getPrefers)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})