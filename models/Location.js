const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const locationSchema = new Schema({
    name : String,
    coordinates : Array,
    discription : String,
    
    nearestStation : String,
    distance : String, 
    availableLines : String

})

const Location = mongoose.model('Location', locationSchema)

module.exports = Location