const OrderRepository = require('../reponsitories/Order.repository');
const BaseController = require('./Base.controller');
const Order = require('../models/order.model');

class OrderController extends BaseController {
    constructor() {
        super(OrderRepository);
    }
    async getOrder(req, res){
        try {
            const data = await Order.find().populate('products.product_id')
            if(data){
                return res.status(200).json({data: data})
            }else{
                return res.status(404).json({message: 'not found'})
            }
        } catch (error) {
            return res.status(500).json({message: 'server error'})
        }
    }
}

module.exports = new OrderController();