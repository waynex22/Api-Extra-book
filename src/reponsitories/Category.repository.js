const BaseRepository = require('./Base.repository')
const category = require('../models/category.model')

class CategoryRepository extends BaseRepository {
    constructor(){
        super(category)
    }
}

module.exports = CategoryRepository