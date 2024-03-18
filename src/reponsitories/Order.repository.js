const BaseRepository = require('./Base.repository')
const order = require('../models/order.model')

class OrderRepository extends BaseRepository {
    constructor(){
        super(order)
    }
}

module.exports = OrderRepository