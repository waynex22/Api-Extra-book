const mongoose = require('mongoose')

const Schema = mongoose.Schema
const objectId = mongoose.Schema.Types.ObjectId
const commentSchema = new Schema({
    _id: {type:objectId, auto:true },
    content: {type:String, require: true},
    rating:{type:Number, require: true},
    product_id: {type:objectId, ref:'products'},
    account_id: {type:objectId, ref:'accounts' },
}, {    
    versionKey: false,
    timestamps: true,
})

const comment = mongoose.model('comments', commentSchema)
module.exports = comment
