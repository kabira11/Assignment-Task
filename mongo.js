const mongoose = require("mongoose")
const mongoDBErrors = require("mongoose-mongodb-errors");
const config = require('./config/database')
//we want to use es6 promise not mongoose promises for this below line used for
mongoose.Promise = global.Promise;
mongoose.plugin(mongoDBErrors);

mongoose.connect(config.database , {useNewUrlParser : true}, (err) =>{
    if(!err) 
    {
        console.log("DB connection successful...")
    }else 
    {
        console.log("Error in DB connection..." + JSON.stringify(err,undefined,2))
    }
});
