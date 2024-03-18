const mongoose = require('mongoose')

const Schema = mongoose.Schema
const objectId = mongoose.Schema.Types.ObjectId
const productSchema = new Schema({
    _id: {type:objectId, auto:true },
    title: {type:String, require: true},
    author: {type:String, require: true},
    image: {type:String, require: true},
    price: {type:Number, require: true},
    discount_price: {type:Number, require: true},
    category_id: {type:objectId, ref:'categories' },
    year: {type:Number, require: true},
    isbn: {type:String, require: true},
    description: {type:String, require: true},
    review_count: {type:Number, require: true, default: 0},
    average_score: {type:Number, require: true, default: 10}

}, {
    versionKey: false
})

const product = mongoose.model('products', productSchema)
module.exports = product
