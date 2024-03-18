const mongoose = require('mongoose')

const Schema = mongoose.Schema
const objectId = mongoose.Schema.Types.ObjectId
const orderSchema = new Schema({
    _id: { type: objectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    home_address: { type: String, required: true },
    account_id: { type: objectId, ref: 'accounts' },
    payment: { type: String, required: true, enum: ['VNPAY', 'ATM', 'CASH'] },
    status: { type: String, enum: ['Chờ xác nhận', 'Đã xác nhận', 'Đang vận chuyển', 'Đã nhận hàng', 'Đã hủy'], required: true , default: 'Chờ xác nhận'},
    products: [
        {
            product_id: { type: objectId, ref: 'products', required: true },
            quantity: { type: Number, required: true }
        }
    ],
}, {
    versionKey: false,
    timestamps: true,
})

const order = mongoose.model('orders', orderSchema)
module.exports = order
