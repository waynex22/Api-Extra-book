const CategoryRepository = require('../reponsitories/Category.repository')
const BaseController = require('./Base.controller')
class CategoryController extends BaseController {
    constructor(){
        super(CategoryRepository)
    }
}

module.exports = new CategoryController