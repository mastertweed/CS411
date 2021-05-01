
const db = require('../db/db')

const getIncentives = (req, res) => {
    //console.log("TTTTTTTTTTTTTTTTTTT")
    var mdb = db.getmdb();
    mdb.collection('incentives')
         .aggregate([ {$project:{"_id":0, "country":0, "min_value":0, "max_value":0}}])
         .toArray(function (err, items) {
         // console.log(items)
         res.send(items)

         })
 }

 const updateIncentives = (req, res) => {
    var mdb = db.getmdb();
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
 }

module.exports = {
    getIncentives,
    updateIncentives
}
