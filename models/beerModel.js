const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeerSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    abv: { type: String },
    ibu: { type: String },
    rating: { type: String },
    description: { type: String },
    brewery: { type: String },
    date: { type: String },
    img: { type: String },
    previousDate: { type: Array },
});

module.exports = mongoose.model('beers', BeerSchema, 'beers');