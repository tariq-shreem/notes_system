const  mongoose  = require("mongoose");


const notesSchema = mongoose.Schema({
    title:String,
    desc:String,
    userId:{type:mongoose.Schema.Types.ObjectId}
},{timestamp:true});

module.exports = mongoose.model('note',notesSchema);