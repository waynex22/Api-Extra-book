const ProductRepository = require('../reponsitories/Product.repository');
const BaseController = require('./Base.controller');
const Product = require('../models/product.model');

class ProductController extends BaseController {
    constructor() {
        super(ProductRepository);
    }
    async search(req, res) {
        try {
            const { query } = req.query;

            if (!query) {
                return res.status(204).json({ message: 'Bad Request: Missing search query' });
            }
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 4;
            const skip = (page - 1) * limit;
            const data = await Product.find({
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { isbn: {$regex: query, $options: 'i' } },
                    { author: { $regex: query, $options: 'i' } }
                ]
            })
                .collation({ locale: 'vi', strength: 2 })
                .skip(skip)
                .limit(limit)
                .exec()

            res.status(200).json({ data: data });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async updateProduct(req,res){
        try {
            const id = req.params.id
            const body = req.body
            const data = await Product.updateOne({_id : id}, {$set: body})
            res.status(200).json({message: 'update success', data : data})
        } catch (error) {
            res.status(500).json({message: 'server error'})
        }
    }
}

module.exports = new ProductController();