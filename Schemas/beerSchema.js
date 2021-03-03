const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beerSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    abv: { type: String },
    ibu: { type: String },
    rating: { type: String },
    description: { type: String },
    brewery: { type: String },
    date: { type: String },
    previousDate: { type: Array },
}, { versionKey: false });


module.exports = beerSchema