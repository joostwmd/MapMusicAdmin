const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const eventSchema = new Schema({
    date: String, 
    name: String,
    discription : String, 
    cost : Number, 
    startTime : String,
    endTime : String,
    age : String,
    genre : String,
    lineUp : Array,
    ticket : String,

     location: {
         type:  Schema.Types.ObjectId,
         ref: "Location"
     }
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event;
