const mongoose = require('mongoose');
module.exports.dbConnection = ()=>{
    mongoose.connect(process.env.CONNECTION_STRING).then( ()=>{
        console.log('connection db is done');
    }).catch( (err)=>{
        console.log(err);
    } );
}